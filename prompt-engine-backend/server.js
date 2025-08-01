// --- 1. DEPENDENCIES & SETUP ---
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// --- 2. DATABASE CONNECTION ---
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected...');
        await seedDatabase();
    } catch (err) {
        console.error('MongoDB Connection Error:', err.message);
        process.exit(1);
    }
};

// --- 3. DATABASE SCHEMA (MODELS) ---
// THE FIX: Schema updated to reflect the new goal of "prompt enhancement".
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


// --- 4. AI SERVICE (GEMINI INTERACTION) ---
// This service now correctly implements the prompt enhancement logic.

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
        const finalUserPrompt = `Instruction: ${promptData.instruction}\nUser's Raw Prompt: "${userInput}"`;

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
                // The key is now "enhancedPrompt", but we return it as "rewrittenText"
                // so the frontend doesn't need to change.
                rewrittenText: jsonResponse.enhancedPrompt.trim(),
                durationMs: Date.now() - startTime,
            };

        } catch (error) {
            console.error('Fatal Error during Gemini API call:', error);
            return { success: false, error: error.message, durationMs: Date.now() - startTime };
        }
    },

    getPerfectExample: (promptData) => {
        const exampleUserPrompt = `Instruction: ${promptData.instruction}\nUser's Raw Prompt: "${promptData.fewShotExample.input}"`;
        const exampleModelResponse = JSON.stringify({
            "enhancedPrompt": promptData.fewShotExample.output
        });
        return { exampleUserPrompt, exampleModelResponse };
    }
};


// --- 5. API CONTROLLERS ---
const RewriteController = {
    handleRewrite: async (req, res) => {
        const { text, tone } = req.body;

        if (!text || !tone) {
            return res.status(400).json({ error: 'Missing "text" or "tone" in request body.' });
        }

        try {
            const prompt = await Prompt.findOne({ slug: tone });
            if (!prompt) return res.status(404).json({ error: `No prompt found for tone: ${tone}` });
            
            const activeVersion = prompt.versions.find(v => v.isActive);
            if (!activeVersion) return res.status(404).json({ error: `No active version for prompt: ${tone}` });

            // Call the correct service function
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
    }
};

// --- 6. API ROUTES ---
const rewriteRouter = express.Router();
rewriteRouter.post('/', RewriteController.handleRewrite);
app.use('/api/v1/rewrite', rewriteRouter);


// --- 7. DATABASE SEEDING (Using the user's exact specifications) ---
const seedDatabase = async () => {
    try {
        const count = await Prompt.countDocuments();
        if (count > 0) {
            // Optional: You can uncomment the next two lines during development 
            // to force a re-seed on every server start.
            // console.log('Database already seeded. Clearing for re-seed...');
            // await Prompt.deleteMany({});
            return;
        }
    
        console.log('No prompts found. Seeding database with new enhancement logic...');
    
        const promptsToSeed = [
            {
                name: "Professional Tone",
                slug: "professional",
                description: "Enhances vague prompts into formal, structured, and business-ready instructions.",
                versions: [{
                    version: 1,
                    isActive: true,
                    instruction: "Improve the prompt to sound professional, structured, and objective. Expand on vague requests to clarify goals, audience, or expected output. The output should be roughly 1.3x to 1.8x the length of the input, but remain purposeful. Don't answer it—just enhance it.",
                    systemInstruction: "You are a prompt rewriter. Your task is to reframe the user's raw prompt into a more formal, well-structured, and clearly scoped version, suitable for business or professional use. Do not simplify the meaning—refine it. Do not answer the question.",
                    fewShotExample: {
                        input: "how do i get better at managing a team?",
                        output: "What are the most effective techniques for improving team leadership, communication, and performance within a professional setting?"
                    }
                }]
            },
            {
                name: "Friendly Tone",
                slug: "friendly",
                description: "Rewrites prompts to feel more casual, welcoming, and easy to engage with.",
                versions: [{
                    version: 1,
                    isActive: true,
                    instruction: "Reword the prompt to feel casual, friendly, and curious. Keep it useful and clear, but make it sound like something you'd ask a smart friend. The output should be roughly 1.3x to 1.8x the length of the input, but remain purposeful. Don't answer it—just rewrite it.",
                    systemInstruction: "You're enhancing prompts to sound warm, casual, and curious. Make the user's request feel more human, more like a conversation starter. Keep it focused and goal-driven. Don't answer the prompt.",
                    fewShotExample: {
                        input: "How can I start swimming as a beginner?",
                        output: "What's a good way to get started with swimming if you're totally new? I'd love simple tips to feel more confident in the water—especially with breathing, strokes, and gear."
                    }
                }]
            },
            {
                name: "Technical Tone",
                slug: "technical",
                description: "Transforms simple prompts into precise, domain-specific questions or requests.",
                versions: [{
                    version: 1,
                    isActive: true,
                    instruction: "Reframe the prompt using expert terminology. Add precision and clarify technical context or scope. Tailor it for someone with a technical or analytical background. The output should be roughly 1.3x to 1.8x the length of the input, but remain purposeful. Don't answer it.",
                    systemInstruction: "You rephrase prompts into technically accurate and detailed instructions. Your goal is to improve clarity and specificity using domain-relevant terms. Always assume the reader is technically literate. Do not provide a solution—just rewrite.",
                    fewShotExample: {
                        input: "Why do airplanes leave trails in the sky?",
                        output: "What are the thermodynamic and atmospheric factors contributing to the formation of condensation trails (contrails) behind high-altitude jet aircraft?"
                    }
                }]
            }
        ];
    
        await Prompt.deleteMany({}); // Clear any old, incorrect data before seeding.
        await Prompt.insertMany(promptsToSeed);
        console.log('Database seeded successfully with new enhancement structure!');
    } catch (error) {
        console.error("Error during database seeding:", error);
    }
};


// --- 8. START THE SERVER ---
const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

startServer(); 