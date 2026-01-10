import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface SuccessPageProps {
  onReset: () => void;
}

export const SuccessPage: React.FC<SuccessPageProps> = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F8F9FA] p-4 font-display">
      <div className="w-full max-w-[420px] bg-white rounded-[32px] shadow-sm p-8 md:p-12 flex flex-col items-center text-center animate-fade-in-up">
        
        {/* Ícone de Sucesso */}
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
          <CheckCircle2 className="h-10 w-10 text-green-500" strokeWidth={2} />
        </div>

        {/* Títulos */}
        <h1 className="mb-3 text-2xl md:text-3xl font-bold text-[#111318]">
          Obrigado!
        </h1>
        
        <p className="mb-10 text-sm md:text-base text-gray-500 leading-relaxed font-medium">
          Recebemos suas informações com sucesso.
        </p>

        {/* Botão de Ação */}
        <a 
          href="https://upsendbrasil.com.br/"
          className="w-full flex items-center justify-center bg-[#1A62FF] hover:bg-[#1550d1] text-white font-bold text-base h-14 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/20"
        >
          Voltar para o site
        </a>
        
      </div>
    </div>
  );
};