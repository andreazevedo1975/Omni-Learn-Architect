
export enum AppStep {
  CONFIG = 'CONFIG',
  SYLLABUS = 'SYLLABUS',
  LEARNING = 'LEARNING',
  QUIZ = 'QUIZ',
  CERTIFICATE = 'CERTIFICATE',
}

export enum CourseLevel {
  BASIC = 'Iniciante/Rápido',
  INTERMEDIATE = 'Intermediário/Profissional',
  ADVANCED = 'Especialização Profunda',
}

export enum AvatarGender {
  FEMALE = 'Feminino',
  MALE = 'Masculino',
}

export interface CourseConfig {
  topic: string;
  level: CourseLevel;
  avatarGender: AvatarGender;
  avatarTone: string;
  studentName: string;
  avatarStyle: string;
  avatarAccessories: string;
  avatarBackground: string;
  avatarFraming: string; // New: HeyGen inspired framing
  videoFormat: string;   // New: HeyGen inspired aspect ratio
}

export interface ModuleSummary {
  id: number;
  title: string;
  description: string;
}

export interface Syllabus {
  courseTitle: string;
  totalHours: string;
  description: string;
  modules: ModuleSummary[];
}

export interface VideoSegment {
  timestamp: string;
  script: string;
  visualAid: string;
}

export interface VideoScript {
  avatarVisual: string;
  voicePrompt: string;
  segments: VideoSegment[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface ModuleContent {
  title: string;
  textContent: string; // Markdown
  videoScript: VideoScript;
  quiz: QuizQuestion[];
}
