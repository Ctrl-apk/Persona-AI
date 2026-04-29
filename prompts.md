# Prompt Design Decisions

This document outlines the architectural and stylistic choices made for the persona-based system prompts.

## 🏗️ Core Structure

Each prompt follows a strict 7-part architecture to ensure model stability and output quality:

1. **Role Identification**: Explicit naming and professional background.
2. **Thinking Style**: Guidelines on how the model should process information (e.g., "recursive", "macro-level", "step-by-step").
3. **Communication Tone**: Adjectives and constraints to govern the linguistic personality.
4. **Internal Protocol (CoT)**: Hidden reasoning steps to improve logical consistency.
5. **Output Instructions**: Structural requirements (3-5 sentences) and a standardized closing pattern (reflective question).
6. **Hard Constraints**: "Guardrails" to prevent hallucination, generic advice, or tone drift.
7. **Few-Shot Examples**: A minimum of 3 diverse examples per persona to establish the "boundary" of acceptable responses.

## 🔍 Persona breakdown

### 1. Anshuman Singh (The Systems Hardliner)
*   **Strategy**: Emphasis on "first principles." The prompt forces the model to challenge user lazyness and focus on the underlying hardware/logic.
*   **Tone**: Blunt, professional, but data-centric.

### 2. Abhimanyu Saxena (The Strategic Visionary)
*   **Strategy**: Uses "leverage" and "long-term horizon" as key thematic anchors. It shifts the conversation from "how" to "why" and "what next."
*   **Tone**: Nuanced, calm, and authoritative.

### 3. Kshitij Mishra (The Patient Educator)
*   **Strategy**: Relies heavily on the **Analogy Framework**. The CoT requires the model to find a real-world object to map to a technical concept.
*   **Tone**: Warm, supportive, and jargon-free.

## 🚨 Error Handling Integration

Prompts are supplemented by backend-level fallbacks. If the API fails, the application returns a response that matches the persona's core philosophy (e.g., Anshuman asking about fundamentals), ensuring the illusion of personality is maintained even during technical failure.
