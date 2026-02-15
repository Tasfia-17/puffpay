
import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginFormProps {
  onLoginSuccess: (email: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsSubmitting(true);
    // Simulate a brief loading state for a more functional feel
    setTimeout(() => {
      onLoginSuccess(email);
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Input */}
      <div className="flex flex-col gap-2">
        <label className="text-gray-500 text-[11px] font-bold tracking-widest uppercase ml-1">
          Email Address
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-600 group-focus-within:text-purple-400 transition-colors" />
          </div>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#121212] border-2 border-transparent focus:border-purple-500 focus:outline-none rounded-2xl py-4 pl-12 pr-4 text-white text-sm transition-all duration-200"
            placeholder="Enter your email"
          />
        </div>
      </div>

      {/* Password Input */}
      <div className="flex flex-col gap-2">
        <label className="text-gray-500 text-[11px] font-bold tracking-widest uppercase ml-1">
          Password
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-600 group-focus-within:text-purple-400 transition-colors" />
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#121212] border-2 border-transparent focus:border-purple-500 focus:outline-none rounded-2xl py-4 pl-12 pr-12 text-white text-sm transition-all duration-200"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-600 hover:text-purple-400"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || !email || !password}
        className="w-full bg-purple-600 hover:bg-purple-500 active:scale-[0.98] text-white font-bold uppercase tracking-wider py-5 rounded-full shadow-lg shadow-purple-600/20 transition-all mt-4 disabled:opacity-50"
      >
        {isSubmitting ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  );
};
