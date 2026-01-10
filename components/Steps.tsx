import React from 'react';
import { FormData } from '../types';
import { Sparkles } from 'lucide-react';

// --- Step 1: Contact Data ---
interface Step1Props {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onNext: () => void;
}

export const Step1Contact: React.FC<Step1Props> = ({ formData, setFormData, onNext }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isFormValid = formData.name && formData.email && formData.whatsapp && formData.website && formData.investment && formData.painPoint;

  const handleNext = async () => {
    if (isFormValid) {
      try {
        const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;

        if (!webhookUrl) {
          console.warn('N8N Webhook URL not configured, proceeding anyway');
          onNext();
          return;
        }

        console.log('Sending data to webhook:', webhookUrl);

        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            whatsapp: formData.whatsapp,
            website: formData.website,
            investment: formData.investment,
            painPoint: formData.painPoint,
            submittedAt: new Date().toISOString(),
            source: 'diagnostico-ia'
          }),
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
          console.error('Webhook failed but proceeding:', response.status);
        } else {
          console.log('Data sent successfully!');
        }

        // Sempre prossegue, mesmo se o webhook falhar
        onNext();
      } catch (error) {
        console.error('Error sending data:', error);
        // Prossegue mesmo com erro para não bloquear o usuário
        onNext();
      }
    } else {
      alert("Por favor, preencha todos os campos para continuar.");
    }
  };

  return (
    <div className="animate-fade-in font-comfortaa flex flex-col h-full justify-between">
      <div className="space-y-5">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
            Diagnóstico de Escala & Efetividade
          </h2>
          <p className="text-muted-foreground text-sm font-medium mt-1">Preencha os dados para receber a análise.</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-foreground/90 ml-1">
              Nome Completo
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ex: João Silva"
              className="w-full bg-input border-2 border-transparent focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 font-medium outline-none transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-foreground/90 ml-1">
              E-mail Corporativo
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="nome@suaempresa.com.br"
              className="w-full bg-input border-2 border-transparent focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 font-medium outline-none transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-foreground/90 ml-1">
              WhatsApp
            </label>
            <input
              type="tel"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="(00) 00000-0000"
              className="w-full bg-input border-2 border-transparent focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 font-medium outline-none transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-foreground/90 ml-1">
              Site da Empresa (URL)
            </label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="www.suaempresa.com.br"
              className="w-full bg-input border-2 border-transparent focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 font-medium outline-none transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-foreground/90 ml-1">
              Qual seu investimento mensal atual em Marketing?
            </label>
            <div className="relative">
              <select
                name="investment"
                value={formData.investment}
                onChange={handleChange}
                className="w-full bg-input border-2 border-transparent focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl px-4 py-3 text-base text-foreground font-medium outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="" disabled className="text-muted-foreground">Selecione uma opção</option>
                <option value="Menos de R$ 5k (Iniciante)">Menos de R$ 5k (Iniciante)</option>
                <option value="De R$ 5k a R$ 20k (Em tração)">De R$ 5k a R$ 20k (Em tração)</option>
                <option value="Acima de R$ 20k (Escala)">Acima de R$ 20k (Escala)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-foreground/50">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-foreground/90 ml-1">
              Onde o calo aperta mais?
            </label>
            <div className="relative">
              <select
                name="painPoint"
                value={formData.painPoint}
                onChange={handleChange}
                className="w-full bg-input border-2 border-transparent focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl px-4 py-3 text-base text-foreground font-medium outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="" disabled className="text-muted-foreground">Selecione uma opção</option>
                <option value="Custo de Aquisição (CAC) muito alto">Custo de Aquisição (CAC) muito alto.</option>
                <option value="Dependo 100% de anúncios pagos">Dependo 100% de anúncios pagos.</option>
                <option value="Marketing desorganizado / Falta de processos">Marketing desorganizado / Falta de processos.</option>
                <option value="Preciso de mais leads qualificados (B2B)">Preciso de mais leads qualificados (B2B).</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-foreground/50">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleNext}
        className="glass-button w-full h-14 rounded-xl text-base md:text-lg mt-8 flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
      >
        <span className="relative z-10 flex items-center gap-2 font-bold">Solicitar Plano de Crescimento <Sparkles size={18} /></span>
      </button>
    </div>
  );
};