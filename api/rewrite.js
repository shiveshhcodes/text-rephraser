const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Database connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('MongoDB Connection Error:', err.message);
    }
};

// Database schemas
const PromptSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    versions: [{
        version: { type: Number, default: 1 },
        isActive: { type: Boolean, default: true },
        instruction: { type: String, required: true },
        systemInstruction: { type: String },
        fewShotExample: {
            input: { type: String },
            output: { type: String },
        },
        createdAt: { type: Date, default: Date.now },
    }],
}, { timestamps: true });

const Prompt = mongoose.model('Prompt', PromptSchema);

const UsageLogSchema = new mongoose.Schema({
    promptId: { type: mongoose.Schema.Types.ObjectId, ref: 'Prompt' },
    promptVersion: { type: Number },
    wasSuccessful: { type: Boolean, required: true },
    durationMs: { type: Number },
    inputCharacterCount: { type: Number },
    outputCharacterCount: { type: Number },
}, { timestamps: true });

const UsageLog = mongoose.model('UsageLog', UsageLogSchema);

// Gemini service
const GeminiService = {
    enhancePrompt: async (userInput, promptData) => {
        const startTime = Date.now();
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`;

        const schema = {
            type: "OBJECT",
            properties: { "enhancedPrompt": { "type": "STRING" } },
            required: ["enhancedPrompt"],
        };

        const systemInstruction = {
            role: "system",
            parts: [{ text: promptData.systemInstruction }],
        };

        const { exampleUserPrompt, exampleModelResponse } = GeminiService.getPerfectExample(promptData);
        const finalUserPrompt = `TASK: ${promptData.instruction}\nRAW_USER_INPUT_DATA: \`\`\`\n${userInput}\n\`\`\``;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [
                        { role: "user", parts: [{ text: exampleUserPrompt }] },
                        { role: "model", parts: [{ text: exampleModelResponse }] },
                        { role: "user", parts: [{ text: finalUserPrompt }] }
                    ],
                    systemInstruction: systemInstruction,
                    generationConfig: {
                        responseMimeType: "application/json",
                        responseSchema: schema,
                    }
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API Error: ${errorData.error?.message || 'Unknown error'}`);
            }

            const result = await response.json();
            const jsonResponse = JSON.parse(result.candidates[0].content.parts[0].text);
            
            if (!jsonResponse.enhancedPrompt) {
                throw new Error("Model failed to return 'enhancedPrompt' key.");
            }

            return {
                success: true,
                rewrittenText: jsonResponse.enhancedPrompt.trim(),
                durationMs: Date.now() - startTime,
            };

        } catch (error) {
            console.error('Fatal Error during Gemini API call:', error);
            return { success: false, error: error.message, durationMs: Date.now() - startTime };
        }
    },

    getPerfectExample: (promptData) => {
        const exampleUserPrompt = `TASK: ${promptData.instruction}\nRAW_USER_INPUT_DATA: \`\`\`\n${promptData.fewShotExample.input}\n\`\`\``;
        const exampleModelResponse = JSON.stringify({
            "enhancedPrompt": promptData.fewShotExample.output
        });
        return { exampleUserPrompt, exampleModelResponse };
    }
};

// API route handler
app.post('/api/v1/rewrite', async (req, res) => {
    const { text, tone } = req.body;

    if (!text || !tone) {
        return res.status(400).json({ error: 'Missing "text" or "tone" in request body.' });
    }

    try {
        await connectDB();
        
        const prompt = await Prompt.findOne({ slug: tone });
        if (!prompt) return res.status(404).json({ error: `No prompt found for tone: ${tone}` });
        
        const activeVersion = prompt.versions.find(v => v.isActive);
        if (!activeVersion) return res.status(404).json({ error: `No active version for prompt: ${tone}` });

        const result = await GeminiService.enhancePrompt(text, activeVersion);

        await UsageLog.create({
            promptId: prompt._id,
            promptVersion: activeVersion.version,
            wasSuccessful: result.success,
            durationMs: result.durationMs,
            inputCharacterCount: text.length,
            outputCharacterCount: result.success ? result.rewrittenText.length : 0,
        });

        if (!result.success) {
            return res.status(500).json({ error: 'Failed to enhance prompt.', details: result.error });
        }

        return res.status(200).json({ rewrittenText: result.rewrittenText });

    } catch (error) {
        console.error('Error in rewrite controller:', error);
        return res.status(500).json({ error: 'An internal server error occurred.' });
    }
});

module.exports = app; 