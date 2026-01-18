# MobiWise AI - Shopping Chat Agent 📱

MobiWise is a premium AI-powered shopping assistant designed to help customers discover, compare, and purchase mobile phones through natural language conversations.

## 🚀 Features

- **Natural Language Discovery**: Ask for phones based on budget, brand, or specific features (e.g., "Best camera phone under ₹30k").
- **Smart Recommendations**: Get tailored suggestions with clear rationales and evidence-based justifications.
- **Deep Comparisons**: Compare specs, pros, and cons of multiple models side-by-side with comparison verdicts.
- **Safety First**: Robust protection against adversarial prompts, prompt injection, and irrelevant queries.
- **Premium UI**: Modern, responsive glassmorphism interface with smooth animations and specialized mobile breadcrumb navigation.
- **Shopping Integration**: Built-in purchase simulation with "Buy Now" functionality.

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, TypeScript
- **Styling**: Vanilla CSS (Modern CSS properties), Material UI (Icons), Framer Motion (Animations)
- **AI Engine**: Google Gemini 1.5 Pro/Flash (via Google AI Studio)
- **Backend**: Vercel Serverless Functions
- **Icons**: Lucide React

## 🏗️ Architecture

- **Dynamic AI Knowledge**: Leverages Gemini's extensive training data to provide real-time information on the latest mobile devices without relying on static local files.
- **Structured Output Engine**: Enforces strict JSON responses from the AI, enabling the frontend to render rich product cards, comparison grids, and technical spec sheets.
- **Breadcrumb Navigation**: Personalized mobile experience with collapsible model switching and breadcrumb-style headers.
- **Context Management**: Maintains conversation history for sophisticated multi-turn dialogue and follow-up analysis.

## 🛡️ Safety & Security

- **System Prompt Hardening**: Instructions explicitly forbid revealing internal logic or sensitive keys.
- **Topic Enforcement**: The agent is programmed to stay within the mobile phone domain, politely redirecting irrelevant queries.
- **Intent Analysis**: Real-time analysis of user intent to provide accurate "Comparison" vs "Recommendation" layouts.

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

### 🛠️ Local Development

To run the application with full backend support locally:

1. **Install Vercel CLI**:

   ```bash
   npm i -g vercel
   ```

2. **Run Dev Server**:

   ```bash
   vercel dev
   ```

   This starts the local server at `http://localhost:3000` (by default) and proxies `/api/*` requests to your local serverless functions.

3. **Build and Preview**:
   ```bash
   npm run build
   npm run preview
   ```

## 📝 Usage Tips

- Use conversational queries: _"What are the trade-offs between a Pixel 8 and an S24?"_
- Be specific about budgets: _"Find me the best gaming phone for under 50,000 INR."_
- Ask for comparisons: _"Compare the camera systems of the last 3 iPhone Pro models."_

---

Built with ❤️ by Gokhlesh.
