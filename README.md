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
<img width="1880" height="897" alt="image" src="https://github.com/user-attachments/assets/c021eda8-1300-4842-9bb1-7cd202cedbbb" />



### Abhimanyu Saxena - Strategic Visionary
<img width="1883" height="916" alt="image" src="https://github.com/user-attachments/assets/bd6b42d8-d745-4956-adf0-d51f3b51ae08" />



### Kshitij Mishra - Patient Educator
<img width="1883" height="907" alt="image" src="https://github.com/user-attachments/assets/91dd722e-4b4b-4731-9430-f9a01132051b" />


## 👤 Personas

- **Anshuman Singh**: The Systems Hardliner. Focuses on DSA and low-level optimization.
- **Abhimanyu Saxena**: The Strategic Visionary. Expert in career growth and executive leadership.
- **Kshitij Mishra**: The Patient Educator. Simplifies complex concepts through analogies.
