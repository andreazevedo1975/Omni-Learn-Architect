import React from 'react';
import { CourseConfig, Syllabus } from '../types';
import { Download } from 'lucide-react';

interface CertificateStepProps {
  config: CourseConfig;
  syllabus: Syllabus;
}

export const CertificateStep: React.FC<CertificateStepProps> = ({ config, syllabus }) => {
  const currentDate = new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="max-w-4xl mx-auto w-full flex flex-col items-center">
      <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Parabéns! Jornada Concluída.</h2>
      
      {/* Certificate Container */}
      <div className="relative bg-[#fffbf0] p-10 md:p-16 shadow-2xl w-full text-center border-8 border-double border-slate-900 mx-auto transform hover:scale-[1.01] transition-transform duration-500">
        {/* Ornamental Corners */}
        <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-slate-900 opacity-20"></div>
        <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-slate-900 opacity-20"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-slate-900 opacity-20"></div>
        <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-slate-900 opacity-20"></div>

        <div className="border-2 border-slate-900/10 h-full p-8 flex flex-col items-center justify-center">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-serif font-black text-slate-900 tracking-tight mb-2 uppercase">Certificado</h1>
            <p className="text-xl text-slate-600 font-serif italic">de conclusão de curso</p>
          </div>

          {/* Body */}
          <div className="mb-10 space-y-2">
            <p className="text-lg text-slate-500">Este documento certifica que</p>
            <p className="text-4xl font-serif font-bold text-indigo-900 border-b-2 border-slate-200 pb-2 inline-block px-12">
              {config.studentName}
            </p>
            <p className="text-lg text-slate-500 mt-4">concluiu com êxito o programa de especialização em</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{syllabus.courseTitle}</p>
          </div>

          {/* Details */}
          <div className="flex justify-center gap-12 mb-12 text-slate-700">
            <div>
              <p className="text-sm uppercase tracking-widest opacity-60">Carga Horária</p>
              <p className="font-bold text-xl">{syllabus.totalHours}</p>
            </div>
             <div>
              <p className="text-sm uppercase tracking-widest opacity-60">Nível</p>
              <p className="font-bold text-xl">{config.level.split('/')[0]}</p>
            </div>
             <div>
              <p className="text-sm uppercase tracking-widest opacity-60">Data</p>
              <p className="font-bold text-xl">{currentDate}</p>
            </div>
          </div>

          {/* Signatures */}
          <div className="flex justify-between w-full max-w-lg mt-8 pt-8 border-t border-slate-300">
            <div className="text-center">
              <div className="font-serif italic text-2xl text-slate-800 mb-2">OmniLearn Architect</div>
              <p className="text-xs uppercase tracking-widest text-slate-500">Diretor Pedagógico (AI)</p>
            </div>
            <div className="text-center">
              <div className="h-8 mb-2">
                {/* Fake Signature */}
                <svg width="150" height="40" viewBox="0 0 150 40">
                  <path d="M10,30 Q40,10 70,30 T140,20" stroke="black" fill="none" strokeWidth="2" />
                </svg>
              </div>
              <p className="text-xs uppercase tracking-widest text-slate-500">Certificação Digital</p>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={() => window.print()}
        className="mt-8 flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-bold transition-colors"
      >
        <Download size={20} />
        Imprimir / Salvar PDF
      </button>
    </div>
  );
};
