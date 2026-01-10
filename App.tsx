import React, { useState } from 'react';
import { Step1Contact } from './components/Steps';
import { SuccessPage } from './components/SuccessPage';
import { Step, FormData, INITIAL_DATA } from './types';
import { Sparkles, ShieldCheck } from 'lucide-react';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.DATA);
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);

  // Transição direta para a solução
  const finishStep = () => setCurrentStep(Step.SOLUTION);

  const resetApp = () => {
    setCurrentStep(Step.DATA);
    setFormData(INITIAL_DATA);
  };

  // Se o passo atual for SOLUÇÃO, renderiza a nova página de sucesso em tela cheia
  if (currentStep === Step.SOLUTION) {
    return <SuccessPage onReset={resetApp} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-comfortaa flex flex-col items-center justify-center py-6 px-4 selection:bg-primary selection:text-white">
      {/* Header Section */}
      <header className="text-center mb-6 w-full max-w-xl">
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-border mb-4 animate-fade-in-up">
          <Sparkles size={14} className="text-primary" />
          <span className="text-xs font-bold text-foreground/70 tracking-wide uppercase">Diagnóstico Gratuito IA</span>
        </div>

        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 leading-tight tracking-tight">
          Diagnóstico de Escala & <span className="text-primary">Efetividade.</span>
        </h1>

        <p className="text-sm md:text-base text-muted-foreground font-medium max-w-md mx-auto leading-relaxed">
          Descubra o plano exato para destravar a escala da sua empresa com eficiência e previsibilidade.
        </p>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-[500px] relative z-10 flex flex-col items-center">

        {/* Card Container */}
        <div className="w-full bg-card rounded-3xl shadow-soft p-6 md:p-8 relative overflow-hidden transition-all duration-300 border border-white/50 ring-1 ring-black/5">
          {/* Step Content */}
          {currentStep === Step.DATA && (
            <Step1Contact formData={formData} setFormData={setFormData} onNext={finishStep} />
          )}
        </div>

        {/* Footer Security Note */}
        <div className="mt-6 text-center flex items-center justify-center gap-2 text-muted-foreground/60">
          <ShieldCheck size={14} />
          <p className="text-xs font-semibold tracking-wide">
            Seus dados estão 100% seguros e protegidos.
          </p>
        </div>
      </main>

      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vh] h-[50vh] bg-blue-400/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vh] h-[50vh] bg-purple-400/10 rounded-full blur-[100px]" />
      </div>
    </div>
  );
};

export default App;