import React, { useState } from 'react';
import { ModuleContent, CourseConfig } from '../types';
import { BookOpen, Video, Clapperboard, MonitorPlay, MessageSquare } from 'lucide-react';

interface LearningStepProps {
  content: ModuleContent;
  moduleIndex: number;
  config: CourseConfig;
  onTakeQuiz: () => void;
}

export const LearningStep: React.FC<LearningStepProps> = ({ content, moduleIndex, config, onTakeQuiz }) => {
  const [activeTab, setActiveTab] = useState<'text' | 'video'>('text');

  return (
    <div className="max-w-6xl mx-auto w-full h-[calc(100vh-140px)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <div>
          <h2 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mb-1">
            Módulo {moduleIndex + 1}
          </h2>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{content.title}</h1>
        </div>
        <div className="flex bg-white dark:bg-slate-800 rounded-lg p-1 shadow-sm border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab('text')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
              activeTab === 'text'
                ? 'bg-slate-800 dark:bg-slate-700 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
            }`}
          >
            <BookOpen size={18} />
            Material Didático
          </button>
          <button
            onClick={() => setActiveTab('video')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
              activeTab === 'video'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
            }`}
          >
            <Video size={18} />
            Roteiro de Vídeo
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 flex flex-col transition-colors">
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-12">
          {activeTab === 'text' ? (
            <article className="prose prose-lg prose-slate dark:prose-invert max-w-none">
               <div className="whitespace-pre-line leading-relaxed font-serif text-slate-800 dark:text-slate-200">
                 {content.textContent.split('\n').map((line, i) => {
                    if (line.startsWith('# ')) return <h1 key={i} className="text-4xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">{line.replace('# ', '')}</h1>;
                    if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold mt-6 mb-3 text-indigo-700 dark:text-indigo-400">{line.replace('## ', '')}</h2>;
                    if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold mt-4 mb-2 text-slate-800 dark:text-slate-100">{line.replace('### ', '')}</h3>;
                    if (line.startsWith('- ')) return <li key={i} className="ml-4 list-disc marker:text-indigo-500">{line.replace('- ', '')}</li>;
                    if (line.trim().startsWith('**') && line.trim().endsWith('**')) return <p key={i} className="font-bold my-2">{line.replaceAll('**', '')}</p>;
                    return <p key={i} className="mb-4 text-slate-700 dark:text-slate-300">{line.replaceAll('**', '')}</p>;
                 })}
               </div>
            </article>
          ) : (
            <div className="space-y-8">
              {/* Video Production Card */}
              <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase mb-2 flex items-center gap-2">
                    <UserIcon gender={config.avatarGender} /> Visual do Avatar
                  </h3>
                  <p className="text-slate-800 dark:text-slate-200">{content.videoScript.avatarVisual}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase mb-2 flex items-center gap-2">
                    <MessageSquare size={16} /> Prompt de Voz
                  </h3>
                  <div className="bg-white dark:bg-slate-800 px-3 py-2 rounded border border-slate-200 dark:border-slate-700 font-mono text-sm text-indigo-600 dark:text-indigo-400">
                    "{content.videoScript.voicePrompt}"
                  </div>
                </div>
              </div>

              {/* Script Table */}
              <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-xs uppercase font-semibold">
                    <tr>
                      <th className="p-4 w-24">Tempo</th>
                      <th className="p-4 w-1/4">Visual (B-Roll)</th>
                      <th className="p-4">Áudio (Fala do Avatar)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                    {content.videoScript.segments.map((segment, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                        <td className="p-4 text-xs font-mono text-slate-500 dark:text-slate-500 font-medium">
                          {segment.timestamp}
                        </td>
                        <td className="p-4 align-top">
                          <div className="flex items-start gap-2 text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                            <MonitorPlay size={14} className="mt-1 flex-shrink-0" />
                            {segment.visualAid}
                          </div>
                        </td>
                        <td className="p-4 align-top">
                           <p className="text-slate-800 dark:text-slate-200 font-serif leading-relaxed italic">
                             "{segment.script}"
                           </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer Actions */}
        <div className="p-6 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 flex justify-end items-center gap-4 flex-shrink-0 transition-colors">
          <span className="text-sm text-slate-500 dark:text-slate-400 italic">
            {activeTab === 'text' ? 'Leia todo o material antes de prosseguir.' : 'Revise o roteiro técnico de produção.'}
          </span>
          <button
            onClick={onTakeQuiz}
            className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <Clapperboard size={18} />
            Realizar Quiz de Fixação
          </button>
        </div>
      </div>
    </div>
  );
};

// Simple helper for avatar icon
const UserIcon = ({ gender }: { gender: string }) => {
  return <span className="text-indigo-500">[{gender === 'Feminino' ? '👩‍🏫' : '👨‍🏫'}]</span>
}