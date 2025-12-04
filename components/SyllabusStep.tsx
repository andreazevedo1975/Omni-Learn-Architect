
import React from 'react';
import { Syllabus } from '../types';
import { Clock, Book, CheckCircle, ArrowRight, GraduationCap } from 'lucide-react';

interface SyllabusStepProps {
  syllabus: Syllabus;
  onStartCourse: () => void;
}

export const SyllabusStep: React.FC<SyllabusStepProps> = ({ syllabus, onStartCourse }) => {
  return (
    <div className="max-w-4xl mx-auto w-full">
      {/* Header Card */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-900 text-white rounded-2xl p-8 shadow-2xl mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4 text-indigo-300 font-semibold uppercase tracking-wider text-sm">
            <GraduationCap size={18} />
            Plano de Curso OLA
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif leading-tight">
            {syllabus.courseTitle}
          </h1>
          <p className="text-indigo-100 text-lg max-w-2xl leading-relaxed mb-6">
            {syllabus.description}
          </p>
          <div className="flex items-center gap-6 text-sm font-medium">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <Clock size={16} />
              {syllabus.totalHours} Carga Horária
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <Book size={16} />
              {syllabus.modules.length} Módulos
            </div>
          </div>
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-6 mb-12">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4 px-2">Estrutura Curricular</h2>
        {syllabus.modules.map((module, index) => (
          <div 
            key={module.id}
            className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-xl hover:scale-[1.02] duration-300 ease-out transition-all hover:border-indigo-200 dark:hover:border-indigo-800 relative overflow-hidden cursor-default"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-indigo-500 group-hover:bg-indigo-600 transition-colors"></div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold font-serif group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors">
                {module.id}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors">
                  {module.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {module.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Bar */}
      <div className="sticky bottom-6 flex justify-center">
        <button
          onClick={onStartCourse}
          className="group flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white text-lg font-bold rounded-full shadow-xl shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 hover:scale-105 transition-all"
        >
          Iniciar Jornada de Aprendizado
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
