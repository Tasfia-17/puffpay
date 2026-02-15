
import React, { useState } from 'react';
import { ArrowLeft, User, Bell, CreditCard, Download, ChevronRight, LogOut, X, Upload, Save, Mail, Smartphone, Plus, Briefcase, FileText, ClipboardList, FileSpreadsheet, Check } from 'lucide-react';

interface SettingsProps {
  profile: { name: string; email: string };
  setProfile: (p: any) => void;
  onBack: () => void;
  onLogout: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ profile, setProfile, onBack, onLogout }) => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [tempName, setTempName] = useState(profile.name);
  
  const [emailNotifs, setEmailNotifs] = useState({ paid: true, overdue: true, newClient: false });
  const [pushNotifs, setPushNotifs] = useState({ paid: true, overdue: true, reminders: true });
  const [exportSelection, setExportSelection] = useState({ profile: true, clients: true, invoices: true, transactions: true });

  const handleSaveProfile = () => {
    setProfile({ ...profile, name: tempName });
    setShowProfileModal(false);
  };

  const settingItems = [
    {
      icon: <User className="w-5 h-5" />,
      title: 'Profile',
      subtitle: profile.email,
      active: false,
      onClick: () => {
        setTempName(profile.name);
        setShowProfileModal(true);
      }
    },
    {
      icon: <Bell className="w-5 h-5" />,
      title: 'Notifications',
      subtitle: 'Configure preferences',
      active: false,
      onClick: () => setShowNotificationsModal(true)
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      title: 'Payment Methods',
      subtitle: 'Manage options',
      active: false,
      onClick: () => setShowPaymentModal(true)
    },
    {
      icon: <Download className="w-5 h-5" />,
      title: 'Export Data',
      subtitle: 'Download your data',
      active: true,
      onClick: () => setShowExportModal(true)
    }
  ];

  const Toggle = ({ active, onClick }: { active: boolean, onClick: () => void }) => (
    <button onClick={onClick} className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${active ? 'bg-[#00E5FF]' : 'bg-gray-800'}`}>
      <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-black transition-transform duration-200 ${active ? 'translate-x-6' : 'translate-x-0'}`} />
    </button>
  );

  const Checkbox = ({ checked, onChange }: { checked: boolean, onChange: () => void }) => (
    <button onClick={onChange} className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${checked ? 'bg-[#00E5FF]' : 'bg-gray-800 border border-white/5'}`}>
      {checked && <Check className="w-4 h-4 text-black stroke-[4]" />}
    </button>
  );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col max-w-[500px] mx-auto p-6 overflow-y-auto relative">
      <div className="flex items-center gap-4 mb-10">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center hover:bg-gray-800 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-gray-500 text-sm">Manage preferences</p>
        </div>
      </div>

      <div className="space-y-4 flex-1">
        {settingItems.map((item, idx) => (
          <div key={idx} onClick={item.onClick} className={`group bg-[#121212] p-5 rounded-[24px] flex items-center justify-between border-2 transition-all cursor-pointer ${item.active ? 'border-pink-500' : 'border-transparent hover:border-gray-800'}`}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center text-gray-400 group-hover:text-white">{item.icon}</div>
              <div>
                <h3 className="font-bold text-[17px] text-white">{item.title}</h3>
                <p className="text-gray-600 text-[13px] font-medium">{item.subtitle}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </div>
        ))}
      </div>

      <div className="mt-auto pt-10 pb-6 space-y-6">
        <button onClick={onLogout} className="w-full bg-[#2D0A14] text-pink-500 font-black py-5 rounded-[24px] border-2 border-transparent hover:border-pink-900/50 flex items-center justify-center gap-3 active:scale-[0.98]">
          <LogOut className="w-5 h-5" /> <span className="uppercase tracking-[0.2em] text-[13px]">LOGOUT</span>
        </button>
      </div>

      {showProfileModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#121212] w-full max-w-[360px] rounded-[32px] p-8 border-2 border-cyan-500 shadow-2xl relative">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-[#00E5FF] text-xl font-black tracking-widest uppercase">PROFILE</h2>
              <button onClick={() => setShowProfileModal(false)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-6 mb-10 text-left">
              <div className="space-y-2">
                <label className="text-gray-600 text-[11px] font-bold tracking-widest uppercase">FULL NAME</label>
                <input type="text" value={tempName} onChange={(e) => setTempName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white font-medium focus:outline-none focus:border-cyan-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-gray-600 text-[11px] font-bold tracking-widest uppercase">EMAIL</label>
                <input type="email" value={profile.email} readOnly className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-gray-500 font-medium cursor-not-allowed" />
              </div>
            </div>
            <button onClick={handleSaveProfile} className="w-full bg-[#00E5FF] text-black font-black py-5 rounded-full uppercase text-[12px] tracking-widest shadow-lg shadow-cyan-500/20">SAVE PROFILE</button>
          </div>
        </div>
      )}

      {showNotificationsModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0A0A0A] w-full max-w-[360px] rounded-[32px] p-8 border-2 border-[#E2E2B6] shadow-2xl relative">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-[#E2E2B6] text-xl font-black tracking-widest uppercase">NOTIFICATIONS</h2>
              <button onClick={() => setShowNotificationsModal(false)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-8 mb-10">
               <div className="space-y-4">
                 <div className="flex items-center gap-2 text-[#E2E2B6]"><Mail className="w-4 h-4"/><span className="text-[10px] font-black tracking-widest uppercase">EMAIL</span></div>
                 <div className="flex justify-between items-center"><span className="text-gray-400 text-sm">Invoice Paid</span><Toggle active={emailNotifs.paid} onClick={() => setEmailNotifs({...emailNotifs, paid: !emailNotifs.paid})} /></div>
               </div>
               <div className="space-y-4">
                 <div className="flex items-center gap-2 text-[#E2E2B6]"><Smartphone className="w-4 h-4"/><span className="text-[10px] font-black tracking-widest uppercase">PUSH</span></div>
                 <div className="flex justify-between items-center"><span className="text-gray-400 text-sm">Invoice Paid</span><Toggle active={pushNotifs.paid} onClick={() => setPushNotifs({...pushNotifs, paid: !pushNotifs.paid})} /></div>
               </div>
            </div>
            <button onClick={() => setShowNotificationsModal(false)} className="w-full bg-[#E2E2B6] text-black font-black py-5 rounded-full uppercase text-[12px] tracking-widest">SAVE PREFERENCES</button>
          </div>
        </div>
      )}
      
      {showPaymentModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#121212] w-full max-w-[360px] rounded-[32px] p-8 border-2 border-[#D8B4FE] shadow-2xl relative">
            <div className="flex justify-between items-center mb-10 pb-4 border-b border-white/5">
              <h2 className="text-[#D8B4FE] text-xl font-black tracking-widest uppercase">PAYMENT METHODS</h2>
              <button onClick={() => setShowPaymentModal(false)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex flex-col items-center justify-center py-10 space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center"><CreditCard className="w-8 h-8 text-gray-700" /></div>
              <p className="text-gray-500 text-[15px] font-medium">No methods added</p>
            </div>
            <div className="mt-6"><button className="w-full border-2 border-white/10 bg-white/5 text-[#D8B4FE] font-black py-4 rounded-[18px] uppercase text-[11px] tracking-widest">ADD NEW</button></div>
          </div>
        </div>
      )}

      {showExportModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#121212] w-full max-w-[360px] rounded-[32px] p-8 border-2 border-pink-500 shadow-2xl relative">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
              <h2 className="text-pink-500 text-xl font-black tracking-widest uppercase">EXPORT DATA</h2>
              <button onClick={() => setShowExportModal(false)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3 mb-10">
              {['Profile Data', 'Clients', 'Invoices', 'Transactions'].map((label, idx) => (
                <div key={idx} className="bg-[#1A1A1A] p-4 rounded-2xl flex items-center gap-4 border border-white/5">
                  <Checkbox checked={true} onChange={() => {}} />
                  <span className="font-bold text-white text-[15px]">{label}</span>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <button onClick={() => setShowExportModal(false)} className="w-full bg-pink-500 text-white font-black py-5 rounded-full uppercase text-[12px] tracking-widest">EXPORT AS JSON</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
