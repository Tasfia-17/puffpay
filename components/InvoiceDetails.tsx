
import React, { useState } from 'react';
import { ArrowLeft, Edit2, Trash2, CheckCircle2 } from 'lucide-react';

interface InvoiceDetailsProps {
  invoice: {
    id: string;
    clientName: string;
    invoiceId: string;
    amount: number;
    status: string;
    dueDate: string;
    itemDescription?: string;
  };
  onBack: () => void;
  onMarkAsPaid: (id: string) => void;
  onDelete: (id: string) => void;
}

export const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({ invoice, onBack, onMarkAsPaid, onDelete }) => {
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock data for line items since the main state doesn't have a detailed list yet
  const lineItems = [
    { name: invoice.itemDescription || 'Webdesign', qty: 1, rate: invoice.amount },
    { name: 'Mobile App', qty: 1, rate: 600 },
  ];

  const subtotal = lineItems.reduce((acc, item) => acc + (item.qty * item.rate), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleMarkAsPaidClick = () => {
    setShowSuccess(true);
    // Delay the transition back to allow user to see the success state
    setTimeout(() => {
      onMarkAsPaid(invoice.id);
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
        BACK TO INVOICES
      </button>

      <div className="bg-[#121212] rounded-[32px] p-8 mb-6 border border-white/5">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter mb-1 uppercase">{invoice.invoiceId}</h1>
            <p className="text-gray-400 font-semibold text-lg">{invoice.clientName}</p>
            <p className="text-gray-600 text-xs mt-1">Due: {invoice.dueDate}</p>
          </div>
          <span className={`text-[10px] font-black px-3 py-1 rounded uppercase tracking-tighter ${
            invoice.status === 'PAID' ? 'bg-purple-900/30 text-purple-400' : 'bg-cyan-900/30 text-cyan-400'
          }`}>
            {invoice.status}
          </span>
        </div>

        <div className="h-[1px] bg-white/5 mb-8"></div>

        <div className="space-y-6">
          <label className="text-gray-500 text-[11px] font-bold tracking-widest uppercase">LINE ITEMS</label>
          
          <div className="space-y-4">
            {lineItems.map((item, idx) => (
              <div key={idx} className="bg-[#0A0A0A] p-6 rounded-[24px] border border-white/5 flex justify-between items-center">
                <div>
                  <h4 className="text-[17px] font-bold mb-1">{item.name}</h4>
                  <p className="text-gray-600 text-sm font-medium">{item.qty} × ${item.rate.toLocaleString()}</p>
                </div>
                <div className="text-xl font-black">${(item.qty * item.rate).toLocaleString()}</div>
              </div>
            ))}
          </div>

          {/* Summary Card */}
          <div className="bg-[#00E5FF] rounded-[24px] p-7 text-black space-y-2.5 shadow-2xl shadow-cyan-500/20 mt-8">
            <div className="flex justify-between items-center text-[13px] font-medium">
              <span className="opacity-60">Subtotal</span>
              <span className="font-bold tracking-tight">${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-[13px] font-medium">
              <span className="opacity-60">Tax</span>
              <span className="font-bold tracking-tight">${tax.toLocaleString()}</span>
            </div>
            <div className="h-[1px] bg-black/10 my-3"></div>
            <div className="flex justify-between items-end pt-1">
              <span className="font-black uppercase tracking-[0.15em] text-[13px]">TOTAL</span>
              <span className="text-4xl font-black tracking-tighter leading-none">
                ${total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-4">
        {invoice.status !== 'PAID' && (
          <button 
            onClick={handleMarkAsPaidClick}
            className="w-full bg-[#D8B4FE] text-black font-black py-5 rounded-full uppercase text-[12px] tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            MARK AS PAID
          </button>
        )}
        
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-[#121212] text-white font-black py-5 rounded-full uppercase text-[11px] tracking-widest flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors border border-white/5">
            <Edit2 className="w-4 h-4" />
            EDIT
          </button>
          <button 
            onClick={() => onDelete(invoice.id)}
            className="bg-[#2D0A14] text-pink-500 font-black py-5 rounded-full uppercase text-[11px] tracking-widest flex items-center justify-center gap-2 hover:bg-[#3D0F1C] transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            DELETE
          </button>
        </div>
      </div>

      {/* Payment Recorded Modal Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#D8B4FE] w-full max-w-[340px] rounded-[32px] p-8 flex flex-col items-center text-center shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="mb-6">
              <CheckCircle2 className="w-20 h-20 text-black stroke-[1.5]" />
            </div>
            <h2 className="text-black text-3xl font-black tracking-tight leading-none mb-4 uppercase">
              PAYMENT<br />RECORDED!
            </h2>
            <p className="text-black/70 text-sm font-medium leading-relaxed max-w-[200px]">
              Wallet updated successfully
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
