import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Stepper } from "@/components/imoveis/wizard/Stepper";
import { WizardFooter } from "@/components/imoveis/wizard/WizardFooter";
import { initialWizard, type WizardData } from "@/components/imoveis/wizard/wizardTypes";
import { StepBasicos } from "@/components/imoveis/wizard/steps/StepBasicos";
import { StepLocalizacao } from "@/components/imoveis/wizard/steps/StepLocalizacao";
import { StepCaracteristicas } from "@/components/imoveis/wizard/steps/StepCaracteristicas";
import { StepAmenidades } from "@/components/imoveis/wizard/steps/StepAmenidades";
import { StepFotos } from "@/components/imoveis/wizard/steps/StepFotos";
import { StepPreco } from "@/components/imoveis/wizard/steps/StepPreco";
import { StepDescricaoIA } from "@/components/imoveis/wizard/steps/StepDescricaoIA";

export const Route = createFileRoute("/imoveis/cadastrar")({
  head: () => ({
    meta: [
      { title: "Cadastrar imóvel — ImobIA" },
      { name: "description", content: "Wizard de cadastro de imóvel em 7 passos." },
    ],
  }),
  component: CadastrarImovelPage,
});

const STEPS = [
  { id: 1, label: "Básico" },
  { id: 2, label: "Local" },
  { id: 3, label: "Características" },
  { id: 4, label: "Amenidades" },
  { id: 5, label: "Fotos" },
  { id: 6, label: "Preço" },
  { id: 7, label: "IA" },
];

function CadastrarImovelPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<WizardData>(initialWizard);
  const navigate = useNavigate();
  const set = (p: Partial<WizardData>) => setData((d) => ({ ...d, ...p }));

  function next() { setStep((s) => Math.min(7, s + 1)); }
  function back() { setStep((s) => Math.max(1, s - 1)); }
  function finish() {
    toast.success("Imóvel cadastrado com sucesso");
    setTimeout(() => navigate({ to: "/imoveis" }), 400);
  }

  return (
    <AppLayout>
      <div className="space-y-6 p-4 md:p-8">
        <PageHeader
          eyebrow="Portfólio"
          title="Cadastrar imóvel"
          description="Em 7 passos teu imóvel tá no ar — IA inclusa."
        />

        <Stepper steps={STEPS} current={step} onJump={(id) => setStep(id)} />

        {step === 1 && <StepBasicos data={data} set={set} />}
        {step === 2 && <StepLocalizacao data={data} set={set} />}
        {step === 3 && <StepCaracteristicas data={data} set={set} />}
        {step === 4 && <StepAmenidades data={data} set={set} />}
        {step === 5 && <StepFotos data={data} set={set} />}
        {step === 6 && <StepPreco data={data} set={set} />}
        {step === 7 && <StepDescricaoIA data={data} set={set} />}

        <WizardFooter step={step} total={7} onBack={back} onNext={next} onFinish={finish} />
      </div>
    </AppLayout>
  );
}
