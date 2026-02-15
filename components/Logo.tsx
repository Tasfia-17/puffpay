
import React from 'react';

interface LogoProps {
  large?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ large = false }) => {
  return (
    <div className={`flex items-center ${large ? 'flex-col gap-6' : 'gap-3'}`}>
      {/* Cute Borderless Fluffy Cloud Logo */}
      <div className={`relative ${large ? 'w-32 h-24' : 'w-12 h-10'} flex items-center justify-center`}>
        {/* Sparkle 1 */}
        <div className={`absolute top-0 right-0 ${large ? 'w-6 h-6' : 'w-2 h-2'} bg-purple-400 rounded-full animate-pulse`}></div>
        {/* Sparkle 2 */}
        <div className={`absolute bottom-1 ${large ? '-left-4 w-4 h-4' : '-left-1 w-1.5 h-1.5'} bg-pink-400 rounded-full animate-bounce`}></div>
        
        <svg 
          viewBox="0 0 24 24" 
          fill="url(#cloudGradient)" 
          className={`${large ? 'w-32 h-32' : 'w-10 h-10'} drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]`} 
        >
          <defs>
            <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
          <path d="M17.5 19c.7 0 1.3-.2 1.8-.7.5-.4.7-1 .7-1.7 0-1.5-1.2-2.7-2.7-2.7h-.3c-.3-1.8-1.9-3.2-3.8-3.2-1.3 0-2.4.7-3.1 1.7-.3-.1-.7-.2-1-.2-1.4 0-2.5 1.1-2.5 2.5 0 .3 0 .6.1.9C5.3 16.2 4 17.5 4 19h13.5z" />
        </svg>
      </div>
      
      {/* Brand Name */}
      <h1 className={`text-white font-logo tracking-tight italic ${large ? 'text-6xl' : 'text-4xl'}`}>
        PuffPay
      </h1>
    </div>
  );
};
