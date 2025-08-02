# Text Rephraser - Render Deployment

This project is organized for Render deployment with separate backend and frontend services.

## Project Structure

```
text-rephraser/
├── backend/                 # Backend API service
│   ├── server.js           # Main Express server
│   ├── rewrite.js          # API rewrite functionality
│   ├── package.json        # Backend dependencies
│   └── render.yaml         # Render backend configuration
├── frontend/               # Frontend React application
│   ├── src/               # React source code
│   ├── public/            # Static assets
│   ├── package.json       # Frontend dependencies
│   └── render.yaml        # Render frontend configuration
└── README.md              # This file
```

## Deployment Instructions

### Backend Deployment (Render)

1. **Create a new Web Service on Render**
   - Connect your GitHub repository
   - Set the root directory to: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

2. **Environment Variables**
   - `MONGO_URI`: Your MongoDB connection string
   - `GEMINI_API_KEY`: Your Google Gemini API key
   - `NODE_ENV`: `production`

### Frontend Deployment (Render)

1. **Create a new Static Site on Render**
   - Connect your GitHub repository
   - Set the root directory to: `frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`

2. **Update Backend URL**
   - After deploying the backend, update the URL in `frontend/src/lib/gemini.ts`
   - Replace `https://your-backend-app-name.onrender.com` with your actual backend URL

## Local Development

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

- `POST /api/v1/rewrite` - Text rewriting endpoint
  - Body: `{ "text": "your text", "tone": "professional|friendly|technical" }`
  - Response: `{ "rewrittenText": "enhanced text" }`

## Technologies Used

- **Backend**: Node.js, Express, MongoDB, Google Gemini API
- **Frontend**: React, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Deployment**: Render
