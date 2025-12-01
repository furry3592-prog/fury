import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, Subject } from "../types";

// Ensure API key is present
const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

export const analyzeHomework = async (
  imageBase64: string, 
  subject: Subject, 
  grade: number
): Promise<AnalysisResult> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please configure process.env.API_KEY.");
  }

  const prompt = `
    Ти - досвідчений та доброзичливий шкільний вчитель в Україні.
    Твоє завдання: перевірити домашнє завдання учня ${grade}-го класу з предмету "${subject}".
    
    1. Уважно проаналізуй зображення зошита.
    2. Знайди помилки (орфографічні, граматичні або математичні).
    3. Оціни роботу за 12-бальною шкалою (від 1 до 12). Будь об'єктивним, але підтримуючим.
    4. Напиши короткий, мотивуючий підсумок українською мовою.
    5. Склади список виправлень з поясненнями.

    Поверни відповідь виключно у форматі JSON згідно зі схемою.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg', 
              data: imageBase64
            }
          },
          {
            text: prompt
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { 
              type: Type.INTEGER, 
              description: "Grade from 1 to 12" 
            },
            summary: { 
              type: Type.STRING, 
              description: "Encouraging feedback summary in Ukrainian" 
            },
            corrections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  original: { type: Type.STRING, description: "The incorrect part (or equation)" },
                  correction: { type: Type.STRING, description: "The correct version" },
                  explanation: { type: Type.STRING, description: "Why it was wrong" }
                }
              }
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AnalysisResult;
    } else {
      throw new Error("No response text received from Gemini.");
    }
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("Не вдалося перевірити роботу. Спробуйте ще раз або перевірте якість фото.");
  }
};