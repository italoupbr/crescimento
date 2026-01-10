import { GoogleGenAI } from "@google/genai";
import { FormData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDiagnosis = async (data: FormData): Promise<string> => {
  try {
    const prompt = `
      Atue como um consultor sênior de Growth Marketing e Eficiência Operacional.
      
      Analise o seguinte perfil de empresa para um diagnóstico de escala:
      - Website: ${data.website}
      - Nível de Investimento: ${data.investment}
      - Principal Gargalo (Dor): "${data.painPoint}"
      
      Com base no nível de investimento e na dor citada, forneça um "Plano de Crescimento" estratégico em formato Markdown.
      
      Estruture a resposta assim:
      
      1. **Análise de Maturidade**: Classifique brevemente o estágio atual da empresa com base no investimento x dor (2 linhas).
      2. **O Que Está Travando a Escala**: Explique tecnicamente por que esse gargalo específico (${data.painPoint}) acontece nesse estágio.
      3. **Plano de Ação (3 Pilares)**:
         - *Curto Prazo*: Uma ação imediata para "estancar o sangramento".
         - *Médio Prazo*: Uma implementação de processo ou tecnologia.
         - *Longo Prazo*: A visão de como isso se transforma em vantagem competitiva.
      
      Mantenha um tom profissional, direto e orientado a dados. Use formatação em negrito para pontos chave.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
      }
    });

    return response.text || "Não foi possível gerar o diagnóstico no momento. Tente novamente.";
  } catch (error) {
    console.error("Erro ao gerar diagnóstico:", error);
    return "Ocorreu um erro ao conectar com nossos consultores de IA. Por favor, verifique sua conexão.";
  }
};