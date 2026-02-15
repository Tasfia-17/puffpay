
import React, { useState } from 'react';
import { Logo } from './Logo';
import { ArrowRight, Sparkles, Zap, ShieldCheck } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Welcome to PuffPay",
      subtitle: "Making business finance feel like a walk through the clouds.",
      color: "from-purple-500 to-pink-500",
      icon: (
        <div className="relative animate-bounce duration-[3000ms]">
          <div className="absolute -top-4 -right-4 animate-pulse">
            <Sparkles className="w-8 h-8 text-yellow-300 fill-yellow-300/30" />
          </div>
          <Logo large />
        </div>
      ),
      accent: "text-purple-400"
    },
    {
      title: "Invoices in Seconds",
      subtitle: "Professional, cute, and ready to send. Get paid faster with a smile.",
      color: "from-cyan-400 to-blue-500",
      icon: (
        <div className="relative">
          <div className="w-32 h-40 bg-[#121212] rounded-[24px] border-2 border-cyan-500 flex flex-col p-4 shadow-[0_0_30px_rgba(0,229,255,0.2)] transform -rotate-6 transition-transform hover:rotate-0">
            <div className="w-10 h-2 bg-cyan-500/20 rounded-full mb-4" />
            <div className="w-full h-1 bg-white/5 rounded-full mb-2" />
            <div className="w-2/3 h-1 bg-white/5 rounded-full mb-6" />
            <div className="mt-auto flex justify-between items-end">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20" />
              <div className="text-cyan-500 font-black text-xl">$550</div>
            </div>
          </div>
          <div className="absolute -bottom-2 -right-6 w-16 h-16 bg-[#D8B4FE] rounded-2xl border-2 border-white/10 flex items-center justify-center rotate-12 shadow-xl">
             <Zap className="w-8 h-8 text-black fill-black/10" />
          </div>
        </div>
      ),
      accent: "text-cyan-400"
    },
    {
      title: "Secure & Simple",
      subtitle: "Your data is tucked away safely. Simple tools for your big dreams.",
      color: "from-pink-500 to-orange-400",
      icon: (
        <div className="relative flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-[#2D0A14] to-transparent border-2 border-pink-500/30 flex items-center justify-center animate-pulse">
            <ShieldCheck className="w-16 h-16 text-pink-500" />
          </div>
          <div className="absolute top-0 right-0 w-4 h-4 bg-purple-400 rounded-full animate-ping" />
        </div>
      ),
      accent: "text-pink-400"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => onComplete();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 max-w-[500px] mx-auto overflow-hidden relative">
      {/* Background Glows */}
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full blur-[120px] opacity-20 transition-colors duration-1000 bg-gradient-to-r ${steps[currentStep].color}`} />
      
      {/* Skip Button */}
      <button 
        onClick={handleSkip}
        className="absolute top-12 right-8 text-gray-500 text-[11px] font-bold tracking-[0.2em] uppercase hover:text-white transition-colors"
      >
        Skip
      </button>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm">
        {/* Animated Icon Container */}
        <div className="mb-16 h-48 flex items-center justify-center">
          {steps[currentStep].icon}
        </div>

        {/* Text Content */}
        <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl font-bold tracking-tighter leading-tight px-4">
            {steps[currentStep].title}
          </h1>
          <p className="text-gray-500 text-lg font-medium leading-relaxed px-6">
            {steps[currentStep].subtitle}
          </p>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="w-full flex flex-col items-center gap-10 pb-12">
        {/* Dots */}
        <div className="flex gap-3">
          {steps.map((_, idx) => (
            <div 
              key={idx}
              className={`h-2 rounded-full transition-all duration-500 ${
                currentStep === idx 
                ? `w-8 bg-gradient-to-r ${steps[currentStep].color}` 
                : 'w-2 bg-white/10'
              }`}
            />
          ))}
        </div>

        {/* CTA Button */}
        <button 
          onClick={handleNext}
          className={`w-full py-5 rounded-full font-black text-[13px] tracking-[0.2em] uppercase flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-2xl relative overflow-hidden group ${
            currentStep === steps.length - 1 
            ? 'bg-white text-black' 
            : `bg-gradient-to-r ${steps[currentStep].color} text-white`
          }`}
        >
          <span className="relative z-10">
            {currentStep === steps.length - 1 ? 'Start Dreaming' : 'Next Step'}
          </span>
          <ArrowRight className={`w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1 ${currentStep === steps.length - 1 ? 'text-black' : 'text-white'}`} />
          {/* Shine effect */}
          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        </button>
      </div>
    </div>
  );
};
