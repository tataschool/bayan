import { GoogleGenAI } from "@google/genai";

// Initialize the client
// Note: process.env.API_KEY is injected by the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateThinkingResponse = async (prompt: string, context?: string) => {
  try {
    const systemInstruction = `
      أنت "بيان"، مساعد ذكي متخصص في مهارات التواصل واللغة العربية، تابع لمنصة ISTA TATA.
      دورك هو مساعدة المتدربين في فهم دروس التواصل، تحسين لغتهم، والإجابة على استفساراتهم المعقدة.
      
      سياق المحادثة الحالي (إن وجد): ${context || 'لا يوجد سياق محدد.'}
      
      يجب أن تكون إجاباتك:
      1. احترافية ومهذبة.
      2. دقيقة لغوياً.
      3. مشجعة ومحفزة.
      4. استخدم التفكير العميق للأسئلة المعقدة لضمان جودة الإجابة.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', // MUST use this model for thinking
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        // Thinking Config: Enable thinking with a high budget for complex reasoning
        thinkingConfig: { 
          thinkingBudget: 32768 // Max budget for gemini-3-pro-preview
        },
        // Do NOT set maxOutputTokens when using thinkingConfig to avoid cutting off the response
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};