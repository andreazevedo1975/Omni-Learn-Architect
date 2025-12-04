import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
  message: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message }) => {
  return (
    <div className="fixed inset-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center transition-colors">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl flex flex-col items-center border border-indigo-100 dark:border-slate-800">
        <Loader2 className="w-12 h-12 text-indigo-600 dark:text-indigo-400 animate-spin mb-4" />
        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 animate-pulse">{message}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">OmniLearn Architect está processando...</p>
      </div>
    </div>
  );
};