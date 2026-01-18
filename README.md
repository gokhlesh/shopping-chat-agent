# MobiWise AI - Shopping Chat Agent 📱

MobiWise is a premium AI-powered shopping assistant designed to help customers discover, compare, and understand mobile phones through natural language conversations.

## 🚀 Features

- **Natural Language Discovery**: Ask for phones based on budget, brand, or specific features (e.g., "Best camera phone under ₹30k").
- **Smart Recommendations**: Get tailored suggestions with clear rationales for why a phone fits your needs.
- **Deep Comparisons**: Compare specs, pros, and cons of multiple models side-by-side.
- **Safety First**: Robust protection against adversarial prompts, prompt injection, and irrelevant queries.
- **Premium UI**: Modern, responsive glassmorphism interface with smooth animations.

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, TypeScript
- **Styling**: Vanilla CSS (Modern CSS properties), Material UI (Icons), Framer Motion (Animations)
- **AI Engine**: Google Gemini 1.5 Flash (via Google AI Studio)
- **Backend**: Vercel Serverless Functions
- **Icons**: Lucide React

## 🏗️ Architecture

- **Context-Aware Agent**: Uses a specialized system prompt that integrates a local JSON "mock database" as the source of truth to prevent hallucinations.
- **Structured Output**: The backend enforces JSON responses from Gemini, allowing the frontend to render rich product cards and specialized views dynamically.
- **Chat History**: Maintains conversation state to allow follow-up questions and deeper explorations.

## 🛡️ Safety & Security

- **System Prompt Hardening**: Instructions explicitly forbid revealing internal logic or sensitive keys.
- **Negative Constraints**: The agent is programmed to refuse irrelevant (non-mobile related), toxic, or biased requests.
- **Input Validation**: Basic pattern matching combined with AI-based intent analysis.

## 📦 Setup Instructions

1. **Clone the repository**:

   ```bash
   git clone <repo-url>
   cd shopping-chat-agent
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add your Gemini API Key:

   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

### 🛠️ Local Development with API

To run both the React frontend and the Vercel Serverless Functions locally:

1. **Install Vercel CLI**:

   ```bash
   npm i -g vercel
   ```

2. **Run carefully**:

   ```bash
   vercel dev
   ```

   This will start the local server at `http://localhost:3000` (by default) and proxy `/api/*` requests to your local serverless functions.

3. **Build and Preview**:
   ```bash
   npm run build
   npm run preview
   ```

## 📝 Known Limitations

- **Dataset Size**: The current implementation uses a mock database (`phones.json`). In a production scenario, this would be replaced with a live API/Database.
- **Offline Mode**: Requires an active internet connection to communicate with the Gemini API.
- **Real-time Pricing**: Prices are static in the mock data and might not reflect market trends.

---

Built with ❤️ for the AI/ML Engineer Assignment.
