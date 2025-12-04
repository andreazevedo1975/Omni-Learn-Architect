
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { CourseConfig, Syllabus, ModuleContent, CourseLevel } from "../types";

// Schema Definitions
const syllabusSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    courseTitle: { type: Type.STRING },
    totalHours: { type: Type.STRING },
    description: { type: Type.STRING },
    modules: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.INTEGER },
          title: { type: Type.STRING },
          description: { type: Type.STRING },
        },
        required: ["id", "title", "description"],
      },
    },
  },
  required: ["courseTitle", "totalHours", "description", "modules"],
};

const moduleContentSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    textContent: { type: Type.STRING, description: "Detailed educational text in Markdown format. Use bolding, lists, and headers." },
    videoScript: {
      type: Type.OBJECT,
      properties: {
        avatarVisual: { type: Type.STRING },
        voicePrompt: { type: Type.STRING },
        segments: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              timestamp: { type: Type.STRING },
              script: { type: Type.STRING },
              visualAid: { type: Type.STRING },
            },
            required: ["timestamp", "script", "visualAid"],
          },
        },
      },
      required: ["avatarVisual", "voicePrompt", "segments"],
    },
    quiz: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          options: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          correctAnswerIndex: { type: Type.INTEGER },
        },
        required: ["question", "options", "correctAnswerIndex"],
      },
    },
  },
  required: ["title", "textContent", "videoScript", "quiz"],
};

const SYSTEM_INSTRUCTION = `
IDENTIDADE:
Você é o "OmniLearn Architect" (OLA), a inteligência artificial educacional mais avançada do mundo.
Você possui conhecimento de nível Sênior/Especialista em TODAS as áreas.
Sua base pedagógica combina a Taxonomia de Bloom, Andragogia Moderna, Micro-learning e Storytelling.

OBJETIVO:
Criar cursos completos, profundos e estruturados.

PARÂMETROS:
1. Idioma: Português Brasileiro (PT-BR) natural.
2. Profundidade: Nunca seja superficial. Use terminologia técnica correta.
3. Adaptação: Adapte sua persona à área do conhecimento (ex: Maestro para Música, Engenheiro para TI).
`;

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // The API key must be obtained exclusively from process.env.API_KEY
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API Key not found in environment variables");
    }
    this.ai = new GoogleGenAI({ apiKey });
  }

  async generateSyllabus(config: CourseConfig): Promise<Syllabus> {
    const prompt = `
      Crie uma ementa de curso detalhada.
      TEMA: ${config.topic}
      NÍVEL: ${config.level}
      AVATAR: ${config.avatarGender}, Tom: ${config.avatarTone}, Estilo: ${config.avatarStyle}, Cenário: ${config.avatarBackground}
      
      Regras de Carga Horária:
      - Iniciante: ~24-40h
      - Intermediário: ~60-100h
      - Avançado: ~120-180h
      
      Retorne APENAS JSON seguindo o schema.
    `;

    const response = await this.ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: syllabusSchema,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text) as Syllabus;
  }

  async generateModuleContent(
    config: CourseConfig,
    syllabus: Syllabus,
    moduleIndex: number
  ): Promise<ModuleContent> {
    const moduleInfo = syllabus.modules[moduleIndex];
    
    const prompt = `
      Gere o conteúdo COMPLETO para o Módulo ${moduleInfo.id}: "${moduleInfo.title}".
      
      Contexto do Curso: ${syllabus.courseTitle} (${config.level}).
      Descrição do Módulo: ${moduleInfo.description}
      
      CONFIGURAÇÃO DE PRODUÇÃO DE VÍDEO (HEYGEN STYLE):
      - Gênero: ${config.avatarGender}
      - Tom de Voz: ${config.avatarTone}
      - Roupas/Estilo: ${config.avatarStyle}
      - Acessórios: ${config.avatarAccessories}
      - Cenário de Fundo: ${config.avatarBackground}
      - Enquadramento de Câmera: ${config.avatarFraming}
      - Formato de Vídeo: ${config.videoFormat}

      REQUISITOS OBRIGATÓRIOS:
      1. Material Didático (textContent): Texto denso, especialista, acadêmico, formatado em Markdown.
      2. Roteiro de Vídeo (videoScript): Script falado natural para um Avatar AI. 
         - O campo 'avatarVisual' deve descrever detalhadamente o avatar E a configuração técnica (ex: "Avatar feminino, estilo executivo, enquadramento close-up em formato vertical para mobile").
         - O campo 'visualAid' nos segmentos deve considerar o formato de vídeo (ex: "Gráfico centralizado otimizado para vertical" se o formato for 9:16).
      3. Quiz: 3 perguntas complexas de fixação.

      Se o nível for "Especialização Profunda", o texto deve ser extremamente técnico.
    `;

    const response = await this.ai.models.generateContent({
      model: "gemini-2.5-flash", 
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: moduleContentSchema,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text) as ModuleContent;
  }
}
