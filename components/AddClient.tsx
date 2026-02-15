
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Upload, User, Mail, Phone, Building, MapPin, CheckCircle2 } from 'lucide-react';

interface AddClientProps {
  onBack: () => void;
  onAdd: (data: any) => void;
}

export const AddClient: React.FC<AddClientProps> = ({ onBack, onAdd }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [address, setAddress] = useState('');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    
    // Show the success popup first
    setShowSuccess(true);
    
    // After a delay, trigger the actual add logic
    setTimeout(() => {
      onAdd({
        name,
        email,
        phone,
        company,
        address,
        avatarUrl: avatarPreview
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col max-w-[500px] mx-auto p-6 overflow-y-auto pb-10 relative">
      {/* Header */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 uppercase text-[11px] font-bold tracking-widest mb-6 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        BACK
      </button>

      <h1 className="text-3xl font-bold tracking-tight uppercase">Add Client</h1>
      <p className="text-gray-500 text-sm mt-1">Create a new client profile</p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-8">
        {/* Avatar Section */}
        <div className="space-y-4">
          <label className="text-gray-500 text-[11px] font-bold tracking-widest uppercase ml-1">
            AVATAR (OPTIONAL)
          </label>
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 rounded-full border-2 border-cyan-500/30 flex items-center justify-center bg-cyan-500/5 overflow-hidden">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <Upload className="w-8 h-8 text-cyan-500 opacity-60" />
              )}
            </div>
            <div className="flex-1 space-y-2">
              <label className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest border border-gray-800 cursor-pointer hover:bg-gray-800 transition-colors">
                <Upload className="w-4 h-4" />
                UPLOAD IMAGE
                <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
              </label>
              <p className="text-[10px] text-gray-600 font-medium">
                Max 5MB. If not uploaded, initials will be shown.
              </p>
            </div>
          </div>
        </div>

        {/* Input Fields */}
        <div className="space-y-6">
          <Field label="CLIENT NAME *" value={name} onChange={setName} placeholder="John Doe" icon={<User className="w-4 h-4" />} />
          <Field label="EMAIL ADDRESS *" value={email} onChange={setEmail} placeholder="john@example.com" type="email" icon={<Mail className="w-4 h-4" />} />
          <Field label="PHONE NUMBER" value={phone} onChange={setPhone} placeholder="+1 (555) 000-0000" type="tel" icon={<Phone className="w-4 h-4" />} />
          <Field label="COMPANY" value={company} onChange={setCompany} placeholder="Acme Inc." icon={<Building className="w-4 h-4" />} />
          <Field label="ADDRESS" value={address} onChange={setAddress} placeholder="123 Main St, City, State" icon={<MapPin className="w-4 h-4" />} />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 pt-4">
          <button 
            type="button"
            onClick={onBack}
            className="bg-[#121212] text-white font-bold py-5 rounded-full uppercase text-xs tracking-widest hover:bg-gray-800 transition-colors border border-gray-900"
          >
            Cancel
          </button>
          <button 
            type="submit"
            disabled={!name || !email}
            className="bg-[#00E5FF] text-black font-bold py-5 rounded-full uppercase text-xs tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-30"
          >
            ADD CLIENT
          </button>
        </div>
      </form>

      {/* Success Modal Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#D8B4FE] w-full max-w-[340px] rounded-[32px] p-8 flex flex-col items-center text-center shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="mb-6">
              <CheckCircle2 className="w-20 h-20 text-black stroke-[1.5]" />
            </div>
            <h2 className="text-black text-3xl font-black tracking-tight leading-none mb-4 uppercase">
              CLIENT<br />CREATED!
            </h2>
            <p className="text-black/70 text-sm font-medium leading-relaxed max-w-[200px]">
              {name || 'The client'} has been added to your clients
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const Field: React.FC<{ 
  label: string; 
  value: string; 
  onChange: (v: string) => void; 
  placeholder: string; 
  type?: string;
  icon: React.ReactNode;
}> = ({ label, value, onChange, placeholder, type = "text", icon }) => (
  <div className="flex flex-col gap-2 group">
    <label className="text-gray-500 text-[11px] font-bold tracking-widest uppercase ml-1">
      {label}
    </label>
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-cyan-500 transition-colors">
        {icon}
      </div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#0A0A0A] border-2 border-transparent focus:border-cyan-500 rounded-xl py-4 pl-12 pr-4 text-white text-sm transition-all focus:outline-none"
      />
    </div>
  </div>
);
