
import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, Plus, Calendar, CheckCircle2 } from 'lucide-react';
import { Client } from '../App';
import { useWallets } from '@privy-io/react-auth';

interface NewInvoiceProps {
  clients: Client[];
  onBack: () => void;
  onSend: (data: any) => void;
}

export const NewInvoice: React.FC<NewInvoiceProps> = ({ clients, onBack, onSend }) => {
  const [client, setClient] = useState('');
  const [clientWallet, setClientWallet] = useState('');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [qty, setQty] = useState(1);
  const [rate, setRate] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const { wallets } = useWallets();

  const subtotal = qty * rate;
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleSend = () => {
    if (!client) {
      alert("Please select a client");
      return;
    }
    if (!clientWallet || !clientWallet.startsWith('0x')) {
      alert("Please enter a valid wallet address for the client");
      return;
    }
    setShowSuccess(true);
    setTimeout(() => {
      onSend({
        client: client,
        clientWallet: clientWallet,
        description: description || "Consulting Services",
        qty,
        rate,
        total,
        dueDate
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col max-w-[500px] mx-auto p-6 overflow-y-auto pb-10 relative">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-500 uppercase text-[11px] font-bold tracking-widest mb-6 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> BACK
      </button>

      <h1 className="text-4xl font-bold tracking-tight uppercase mb-1">New Invoice</h1>
      <p className="text-gray-500 text-sm">Create a new invoice for your client</p>

      <div className="mt-10 space-y-8">
        <div className="flex flex-col gap-2">
          <label className="text-gray-500 text-[11px] font-bold tracking-widest uppercase ml-1">CLIENT</label>
          <div className="relative">
            <select
              value={client}
              onChange={(e) => setClient(e.target.value)}
              className="w-full bg-[#121212] border-2 border-transparent focus:border-cyan-500 appearance-none rounded-xl py-4 px-4 text-white text-[15px] font-medium transition-all focus:outline-none"
            >
              <option value="">Select a client</option>
              {clients.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
          </div>
          {clients.length === 0 && (
            <p className="text-pink-500 text-[10px] font-bold uppercase px-1">No clients found. Add one in the Clients tab first.</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-500 text-[11px] font-bold tracking-widest uppercase ml-1">CLIENT WALLET ADDRESS</label>
          <input
            type="text"
            value={clientWallet}
            onChange={(e) => setClientWallet(e.target.value)}
            placeholder="0x..."
            className="w-full bg-[#121212] border-2 border-transparent focus:border-purple-500 rounded-xl py-4 px-4 text-white text-[15px] font-mono transition-all focus:outline-none"
          />
          <p className="text-gray-600 text-[10px] px-1">Tempo wallet address where client will pay from</p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-500 text-[11px] font-bold tracking-widest uppercase ml-1">DUE DATE</label>
          <div className="relative">
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full bg-[#0A0A0A] border-2 border-cyan-500/50 focus:border-cyan-500 rounded-xl py-4 px-4 text-white text-[15px] font-medium transition-all focus:outline-none [color-scheme:dark]"
            />
            <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center px-1">
            <label className="text-gray-500 text-[11px] font-bold tracking-widest uppercase">LINE ITEMS</label>
            <button className="bg-[#00E5FF] text-black text-[11px] font-black px-4 py-2 rounded-full flex items-center gap-1 uppercase tracking-widest">
              <Plus className="w-3.5 h-3.5 stroke-[3]" /> ADD
            </button>
          </div>
          <div className="bg-[#0D0D0D] p-5 rounded-[24px] space-y-5 border border-white/5">
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#141414] border border-white/5 rounded-xl py-3.5 px-4 text-white text-sm focus:outline-none focus:border-cyan-500"
            />
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-600 text-[9px] font-bold tracking-widest uppercase ml-1">QTY</label>
                <input type="number" value={qty} onChange={(e) => setQty(Number(e.target.value))} className="w-full bg-[#141414] border border-white/5 rounded-xl py-3 px-4 text-white text-sm focus:border-cyan-500 font-bold" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-600 text-[9px] font-bold tracking-widest uppercase ml-1">RATE</label>
                <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full bg-[#141414] border border-white/5 rounded-xl py-3 px-4 text-white text-sm focus:border-cyan-500 font-bold" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-600 text-[9px] font-bold tracking-widest uppercase ml-1">AMOUNT</label>
                <div className="w-full py-3 px-2 text-white text-sm font-black flex items-center">${subtotal.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#00E5FF] rounded-[24px] p-7 text-black space-y-2.5 shadow-2xl shadow-cyan-500/20">
          <div className="flex justify-between items-center text-[13px] font-medium">
            <span className="opacity-60">Subtotal</span>
            <span className="font-bold tracking-tight">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-[13px] font-medium">
            <span className="opacity-60">Tax (10%)</span>
            <span className="font-bold tracking-tight">${tax.toFixed(2)}</span>
          </div>
          <div className="h-[1px] bg-black/10 my-3"></div>
          <div className="flex justify-between items-end pt-1">
            <span className="font-black uppercase tracking-[0.15em] text-[13px]">TOTAL</span>
            <span className="text-5xl font-black tracking-tighter leading-none">${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4">
          <button onClick={onBack} className="bg-[#121212] text-white font-black py-5 rounded-full uppercase text-[11px] tracking-widest border border-white/5">CANCEL</button>
          <button onClick={handleSend} disabled={!client} className="bg-[#D8B4FE] text-black font-black py-5 rounded-full uppercase text-[11px] tracking-widest disabled:opacity-30">SEND INVOICE</button>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#00E5FF] w-full max-w-[340px] rounded-[32px] p-8 flex flex-col items-center text-center shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="mb-6"><CheckCircle2 className="w-20 h-20 text-black stroke-[1.5]" /></div>
            <h2 className="text-black text-3xl font-black tracking-tight leading-none mb-4 uppercase">INVOICE<br />SENT!</h2>
            <p className="text-black/70 text-sm font-medium leading-relaxed max-w-[200px]">Invoice sent to {client}</p>
          </div>
        </div>
      )}
    </div>
  );
};
