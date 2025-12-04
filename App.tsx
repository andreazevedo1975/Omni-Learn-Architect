import React, { useState, useEffect } from 'react';
import { GeminiService } from './services/geminiService';
import { ConfigurationStep } from './components/ConfigurationStep';
import { SyllabusStep } from './components/SyllabusStep';
import { LearningStep } from './components/LearningStep';
import { QuizStep } from './components/QuizStep';
import { CertificateStep } from './components/CertificateStep';
import { LoadingOverlay } from './components/LoadingOverlay';
import { AppStep, CourseConfig, Syllabus, ModuleContent } from './types';
import { ShieldCheck, LogOut, Moon, Sun } from 'lucide-react';

const gemini = new GeminiService();

export default function App() {
  const [step, setStep] = useState<AppStep>(AppStep.CONFIG);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // App State
  const [config, setConfig] = useState<CourseConfig | null>(null);
  const [syllabus, setSyllabus] = useState<Syllabus | null>(null);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentModuleContent, setCurrentModuleContent] = useState<ModuleContent | null>(null);

  // Theme Toggler
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // --- Handlers ---

  const handleConfigComplete = async (newConfig: CourseConfig) => {
    setConfig(newConfig);
    setLoading(true);
    setLoadingMessage('OmniLearn Architect está estruturando o currículo do curso...');
    
    try {
      const generatedSyllabus = await gemini.generateSyllabus(newConfig);
      setSyllabus(generatedSyllabus);
      setStep(AppStep.SYLLABUS);
    } catch (error) {
      console.error("Failed to generate syllabus", error);
      alert("Erro ao gerar ementa. Verifique sua chave API ou tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const startModule = async (index: number) => {
    if (!config || !syllabus) return;
    
    setLoading(true);
    setLoadingMessage(`Gerando conteúdo profundo para o Módulo ${index + 1}: ${syllabus.modules[index].title}...`);

    try {
      const content = await gemini.generateModuleContent(config, syllabus, index);
      setCurrentModuleContent(content);
      setCurrentModuleIndex(index);
      setStep(AppStep.LEARNING);
    } catch (error) {
      console.error("Failed to generate module", error);
      alert("Erro ao gerar conteúdo do módulo. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleStartCourse = () => {
    startModule(0);
  };

  const handleTakeQuiz = () => {
    setStep(AppStep.QUIZ);
  };

  const handleModulePassed = () => {
    if (!syllabus) return;
    
    const nextIndex = currentModuleIndex + 1;
    if (nextIndex < syllabus.modules.length) {
      startModule(nextIndex);
    } else {
      setStep(AppStep.CERTIFICATE);
    }
  };

  const handleRestart = () => {
    if (confirm("Isso apagará todo o progresso atual. Deseja continuar?")) {
      setStep(AppStep.CONFIG);
      setConfig(null);
      setSyllabus(null);
      setCurrentModuleIndex(0);
      setCurrentModuleContent(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      {/* Top Navigation */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xl">
            <ShieldCheck className="fill-current" />
            <span>OmniLearn<span className="text-slate-900 dark:text-white font-light">Architect</span></span>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
              title={isDarkMode ? "Modo Claro" : "Modo Escuro"}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {step !== AppStep.CONFIG && config && (
              <div className="hidden md:flex items-center gap-6 text-sm border-l border-slate-200 dark:border-slate-700 pl-4">
                <div className="flex flex-col items-end">
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{config.studentName}</span>
                  <span className="text-slate-500 dark:text-slate-400 text-xs">{config.topic}</span>
                </div>
                {step !== AppStep.CERTIFICATE && (
                  <button onClick={handleRestart} className="text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors" title="Sair do Curso">
                    <LogOut size={18} />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 flex flex-col items-center">
        {step === AppStep.CONFIG && <ConfigurationStep onComplete={handleConfigComplete} />}
        
        {step === AppStep.SYLLABUS && syllabus && (
          <SyllabusStep syllabus={syllabus} onStartCourse={handleStartCourse} />
        )}
        
        {step === AppStep.LEARNING && currentModuleContent && config && (
          <LearningStep 
            content={currentModuleContent} 
            moduleIndex={currentModuleIndex} 
            config={config} 
            onTakeQuiz={handleTakeQuiz} 
          />
        )}
        
        {step === AppStep.QUIZ && currentModuleContent && (
          <QuizStep 
            questions={currentModuleContent.quiz} 
            onPass={handleModulePassed} 
          />
        )}
        
        {step === AppStep.CERTIFICATE && config && syllabus && (
          <CertificateStep config={config} syllabus={syllabus} />
        )}
      </main>

      {/* Loading Overlay */}
      {loading && <LoadingOverlay message={loadingMessage} />}
      
      {/* Footer */}
      <footer className="py-6 text-center text-slate-400 dark:text-slate-600 text-sm border-t border-slate-200 dark:border-slate-800">
        <p>© 2024 OmniLearn Architect AI System. Powered by Google Gemini.</p>
      </footer>
    </div>
  );
}