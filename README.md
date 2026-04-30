# Persona-Based AI Chatbot

A production-ready full-stack chatbot application featuring three distinct professional personas for technical and career guidance.

## 🚀 Features

- **Distinct Personas**: 3 high-fidelity personalities (Anshuman, Abhimanyu, Kshitij) with unique system prompts, tones, and expertise.
- **LLM Abstraction**: Unified interface for Gemini (Primary) and OpenAI (Pluggable), supporting easy provider switching.
- **Full-Stack Architecture**: Secure Express backend for prompt injection and API key management, paired with a React/Vite/Tailwind frontend.
- **Polished UI**: Built with `motion` for fluid transitions, features a persona switcher, interactive suggestion chips, and a responsive chat window.
- **Robust Error Handling**: Persona-specific fallback responses ensure users never experience a "broken" chat during API outages.

## 🛠️ Setup

1. **Environment Variables**:
   Create a `.env` file (or set in your hosting platform):
   ```env
   GEMINI_API_KEY=your_gemini_key
   OPENAI_API_KEY=your_openai_key_optional
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Production Build**:
   ```bash
   npm run build
   npm start
   ```

## 📂 Project Structure

- `/server.ts`: Express server entry point.
- `/src/App.tsx`: Main React UI.
- `/src/lib/llm.ts`: LLM abstraction bridge.
- `/src/lib/prompts.ts`: Persona definitions and system instructions.
- `/src/lib/utils.ts`: Styling and UI utilities.

## 📸 Screenshots

### Anshuman Singh - Systems Hardliner
![Anshuman Singh UI](screenshots/anshuman.png)

### Abhimanyu Saxena - Strategic Visionary
![Abhimanyu Saxena UI](screenshots/abhimanyu.png)

### Kshitij Mishra - Patient Educator
![Kshitij Mishra UI](screenshots/kshitij.png)

## 👤 Personas

- **Anshuman Singh**: The Systems Hardliner. Focuses on DSA and low-level optimization.
- **Abhimanyu Saxena**: The Strategic Visionary. Expert in career growth and executive leadership.
- **Kshitij Mishra**: The Patient Educator. Simplifies complex concepts through analogies.
