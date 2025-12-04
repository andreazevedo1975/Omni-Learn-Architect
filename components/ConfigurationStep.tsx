
import React, { useState } from 'react';
import { CourseConfig, CourseLevel, AvatarGender } from '../types';
import { BrainCircuit, BookOpen, User, Sparkles, Shirt, Glasses, Image, Mic, Monitor, Smartphone, Square, ScanFace, PersonStanding } from 'lucide-react';

interface ConfigurationStepProps {
  onComplete: (config: CourseConfig) => void;
}

export const ConfigurationStep: React.FC<ConfigurationStepProps> = ({ onComplete }) => {
  const [topic, setTopic] = useState('');
  const [studentName, setStudentName] = useState('');
  const [level, setLevel] = useState<CourseLevel>(CourseLevel.BASIC);
  const [gender, setGender] = useState<AvatarGender>(AvatarGender.FEMALE);
  const [tone, setTone] = useState('Profissional e Encorajador');
  
  // Visual customization states
  const [style, setStyle] = useState('Formal Clássico');
  const [accessories, setAccessories] = useState('');
  const [background, setBackground] = useState('Estúdio Minimalista');

  // New HeyGen-inspired states
  const [framing, setFraming] = useState('Meio Corpo (Padrão)');
  const [format, setFormat] = useState('Paisagem (16:9)');

  // Dynamic suggestions based on gender
  const styleSuggestions = gender === AvatarGender.MALE
    ? ['Executivo Moderno', 'Formal Clássico', 'Casual Tech', 'Acadêmico', 'Futurista']
    : ['Formal Clássico', 'Executivo Moderno', 'Casual de Negócios', 'Acadêmico', 'Futurista'];

  const toneSuggestions = ['Profissional e Encorajador', 'Autoritário', 'Amigável', 'Jornalístico', 'Didático', 'Socrático'];

  const accessorySuggestions = ['Óculos', 'Colar Discreto', 'Relógio Smart', 'Nenhum'];
  const backgroundSuggestions = ['Biblioteca', 'Escritório Moderno', 'Laboratório High-Tech', 'Estúdio Minimalista', 'Sala de Aula', 'Auditório'];

  // Production settings options
  const formatOptions = [
    { label: 'Paisagem (16:9)', icon: Monitor, value: 'Paisagem (16:9)' },
    { label: 'Retrato (9:16)', icon: Smartphone, value: 'Retrato (9:16)' },
    { label: 'Quadrado (1:1)', icon: Square, value: 'Quadrado (1:1)' },
  ];

  const framingOptions = [
    { label: 'Close-up (Rosto)', icon: ScanFace, value: 'Close-up (Rosto)' },
    { label: 'Meio Corpo (Padrão)', icon: User, value: 'Meio Corpo (Padrão)' },
    { label: 'Corpo Inteiro', icon: PersonStanding, value: 'Corpo Inteiro' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic && studentName) {
      onComplete({
        topic,
        studentName,
        level,
        avatarGender: gender,
        avatarTone: tone,
        avatarStyle: style,
        avatarAccessories: accessories || 'Nenhum',
        avatarBackground: background,
        avatarFraming: framing,
        videoFormat: format,
      });
    }
  };

  const getSuggestionClass = (current: string, suggestion: string) => {
    return current === suggestion
      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md transform scale-105'
      : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-indigo-300 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-600';
  };

  // Shared input class with enhanced focus styles (projected shadow & subtle ring)
  const inputClass = "w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 transition-all duration-300 outline-none hover:border-indigo-200 dark:hover:border-indigo-700 hover:bg-white dark:hover:bg-slate-900 focus:bg-white dark:focus:bg-slate-950 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-400/20 focus:shadow-[0_0_20px_rgba(99,102,241,0.15)]";

  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-4">
          <BrainCircuit size={32} />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">OmniLearn Architect</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Defina os parâmetros para a criação da sua jornada educacional personalizada.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors">
        <div className="p-8 space-y-8">
          
          {/* Identity Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-slate-800 dark:text-slate-100">
              <User className="text-indigo-500" /> Identificação
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Seu Nome</label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Ex: Ana Silva"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tópico do Curso</label>
                <input
                  type="text"
                  required
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Ex: Astrofísica, Marketing Digital..."
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <hr className="border-slate-100 dark:border-slate-700" />

          {/* Level Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-slate-800 dark:text-slate-100">
              <BookOpen className="text-indigo-500" /> Nível de Profundidade
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.values(CourseLevel).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setLevel(lvl)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    level === lvl
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/30'
                  }`}
                >
                  <div className="font-semibold">{lvl.split('/')[0]}</div>
                  <div className="text-xs opacity-75 mt-1">{lvl.split('/')[1] || 'Completo'}</div>
                </button>
              ))}
            </div>
          </div>

          <hr className="border-slate-100 dark:border-slate-700" />

          {/* Avatar Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-slate-800 dark:text-slate-100">
              <Sparkles className="text-indigo-500" /> Personalização do Instrutor (Avatar AI)
            </h2>
            
            {/* Row 1: Gender & Tone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Gênero do Avatar</label>
                <div className="flex gap-4">
                  {Object.values(AvatarGender).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(g)}
                      className={`flex-1 py-3 px-4 rounded-xl border transition-all duration-200 ${
                        gender === g
                          ? 'bg-slate-800 dark:bg-slate-700 text-white border-slate-800 dark:border-slate-600 shadow-lg scale-[1.02]'
                          : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                  <Mic size={16} className="text-slate-400" /> Tom de Voz
                </label>
                <input
                  type="text"
                  list="tone-suggestions-list"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  placeholder="Ex: Autoritário, Socrático..."
                  className={inputClass}
                />
                <datalist id="tone-suggestions-list">
                  {toneSuggestions.map((t) => (
                    <option key={t} value={t} />
                  ))}
                </datalist>
                <div className="flex flex-wrap gap-2 mt-3">
                  {toneSuggestions.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTone(t)}
                      className={`text-xs font-medium px-2.5 py-1.5 rounded-full border transition-all ${getSuggestionClass(tone, t)}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Row 2: Visual Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                  <Shirt size={16} className="text-slate-400" /> Estilo de Roupa
                </label>
                <input
                  type="text"
                  list="style-suggestions-list"
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  placeholder="Ex: Formal Clássico..."
                  className={inputClass}
                />
                <datalist id="style-suggestions-list">
                  {styleSuggestions.map((s) => (
                    <option key={s} value={s} />
                  ))}
                </datalist>
                <div className="flex flex-wrap gap-2 mt-3">
                  {styleSuggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setStyle(s)}
                      className={`text-xs font-medium px-2.5 py-1.5 rounded-full border transition-all ${getSuggestionClass(style, s)}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                  <Glasses size={16} className="text-slate-400" /> Acessórios
                </label>
                <input
                  type="text"
                  value={accessories}
                  onChange={(e) => setAccessories(e.target.value)}
                  placeholder="Ex: Óculos, Colar..."
                  className={inputClass}
                />
                 <div className="flex flex-wrap gap-2 mt-3">
                  {accessorySuggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setAccessories(s)}
                      className={`text-xs font-medium px-2.5 py-1.5 rounded-full border transition-all ${getSuggestionClass(accessories, s)}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                  <Image size={16} className="text-slate-400" /> Cenário de Fundo
                </label>
                <input
                  type="text"
                  list="background-suggestions-list"
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  placeholder="Ex: Biblioteca, Laboratório High-Tech..."
                  className={inputClass}
                />
                <datalist id="background-suggestions-list">
                  {backgroundSuggestions.map((s) => (
                    <option key={s} value={s} />
                  ))}
                </datalist>
                 <div className="flex flex-wrap gap-2 mt-3">
                  {backgroundSuggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setBackground(s)}
                      className={`text-xs font-medium px-2.5 py-1.5 rounded-full border transition-all ${getSuggestionClass(background, s)}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Row 3: HeyGen Style Production Settings */}
            <div className="border-t border-slate-100 dark:border-slate-700 pt-6 mt-2">
              <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-4 flex items-center gap-2">
                <Monitor size={16} /> Configurações de Produção (Estilo HeyGen)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Aspect Ratio */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Formato de Vídeo</label>
                  <div className="grid grid-cols-3 gap-2">
                    {formatOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setFormat(opt.value)}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 ${
                          format === opt.value
                            ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-500 text-indigo-700 dark:text-indigo-300 shadow-md ring-2 ring-indigo-500/20'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-indigo-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <opt.icon size={24} className={`mb-2 ${format === opt.value ? 'stroke-2' : 'stroke-[1.5]'}`} />
                        <span className="text-xs font-semibold">{opt.label.split(' ')[0]}</span>
                        <span className="text-[10px] opacity-70 mt-0.5">{opt.label.split('(')[1].replace(')', '')}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Framing */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Enquadramento</label>
                  <div className="grid grid-cols-3 gap-2">
                    {framingOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setFraming(opt.value)}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 ${
                          framing === opt.value
                            ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-500 text-indigo-700 dark:text-indigo-300 shadow-md ring-2 ring-indigo-500/20'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-indigo-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <opt.icon size={24} className={`mb-2 ${framing === opt.value ? 'stroke-2' : 'stroke-[1.5]'}`} />
                        <span className="text-xs font-medium text-center leading-tight">{opt.label.split('(')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        <div className="p-6 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 flex justify-end">
          <button
            type="submit"
            className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-indigo-500/30 dark:hover:shadow-indigo-900/50 hover:scale-[1.02] transition-all duration-300 ease-out transform active:scale-[0.98]"
          >
            Gerar Estrutura do Curso
          </button>
        </div>
      </form>
    </div>
  );
};
