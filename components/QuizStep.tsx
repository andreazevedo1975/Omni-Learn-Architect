import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { CheckCircle, XCircle, AlertCircle, ArrowRight } from 'lucide-react';

interface QuizStepProps {
  questions: QuizQuestion[];
  onPass: () => void;
}

export const QuizStep: React.FC<QuizStepProps> = ({ questions, onPass }) => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  
  const toggleAnswer = (qIndex: number, optIndex: number) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qIndex]: optIndex }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const allCorrect = questions.every((q, i) => answers[i] === q.correctAnswerIndex);
  const score = questions.reduce((acc, q, i) => (answers[i] === q.correctAnswerIndex ? acc + 1 : acc), 0);
  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Avaliação de Conhecimento</h2>
        <p className="text-slate-600 dark:text-slate-400">Demonstre seu domínio sobre o módulo para avançar.</p>
      </div>

      <div className="space-y-8">
        {questions.map((q, qIdx) => {
          const isCorrect = submitted && answers[qIdx] === q.correctAnswerIndex;
          
          return (
            <div key={qIdx} className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm border p-6 transition-colors ${
              submitted 
                ? isCorrect ? 'border-green-200 dark:border-green-900 bg-green-50/30 dark:bg-green-900/10' : 'border-red-200 dark:border-red-900 bg-red-50/30 dark:bg-red-900/10'
                : 'border-slate-200 dark:border-slate-700'
            }`}>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-start gap-3">
                <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm px-2 py-1 rounded">Q.{qIdx + 1}</span>
                {q.question}
              </h3>

              <div className="space-y-3">
                {q.options.map((opt, optIdx) => {
                  const selected = answers[qIdx] === optIdx;
                  let itemClass = "w-full text-left p-4 rounded-lg border-2 transition-all flex items-center justify-between ";
                  
                  if (submitted) {
                    if (optIdx === q.correctAnswerIndex) itemClass += "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-900 dark:text-green-300 font-medium";
                    else if (selected) itemClass += "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-300";
                    else itemClass += "border-slate-100 dark:border-slate-700 opacity-50 dark:text-slate-500";
                  } else {
                    if (selected) itemClass += "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-900 dark:text-indigo-300 font-medium";
                    else itemClass += "border-slate-100 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-300";
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => toggleAnswer(qIdx, optIdx)}
                      disabled={submitted}
                      className={itemClass}
                    >
                      <span>{opt}</span>
                      {submitted && optIdx === q.correctAnswerIndex && <CheckCircle size={20} className="text-green-600 dark:text-green-400" />}
                      {submitted && selected && optIdx !== q.correctAnswerIndex && <XCircle size={20} className="text-red-600 dark:text-red-400" />}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 flex flex-col items-center">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < questions.length}
            className="px-10 py-4 bg-indigo-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition-all"
          >
            Submeter Respostas
          </button>
        ) : (
          <div className="text-center animate-fade-in">
            <div className="text-4xl font-bold mb-2 text-slate-900 dark:text-white">{percentage}% de Acerto</div>
            {allCorrect ? (
              <div className="space-y-4">
                <p className="text-green-600 dark:text-green-400 font-medium flex items-center justify-center gap-2">
                  <CheckCircle /> Módulo Concluído com Sucesso!
                </p>
                <button
                  onClick={onPass}
                  className="px-10 py-4 bg-slate-900 dark:bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-black dark:hover:bg-indigo-500 transition-all flex items-center gap-2 mx-auto"
                >
                  Próximo Módulo <ArrowRight size={20} />
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                 <p className="text-red-500 dark:text-red-400 font-medium flex items-center justify-center gap-2">
                  <AlertCircle /> Você precisa acertar 100% para avançar.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setAnswers({});
                  }}
                  className="px-8 py-3 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                >
                  Tentar Novamente
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};