
import React, { useState } from 'react';
import { useBalance } from '../hooks/useBalance';
import { useWallets } from '@privy-io/react-auth';
import { 
  Settings as SettingsIcon, Plus, TrendingUp, DollarSign, Users, Home, 
  FileText, CreditCard, Wallet, Trash2, 
  ArrowUpRight, ArrowDownRight, ClipboardList,
  ArrowDownToLine
} from 'lucide-react';
import { NewInvoice } from './NewInvoice';
import { AddClient } from './AddClient';
import { InvoiceDetails } from './InvoiceDetails';
import { Settings } from './Settings';
import { Invoice, Client, PaymentRecord, Transaction } from '../App';

interface DashboardProps {
  profile: { name: string; email: string };
  setProfile: (p: any) => void;
  invoices: Invoice[];
  setInvoices: (i: Invoice[]) => void;
  clients: Client[];
  setClients: (c: Client[]) => void;
  payments: PaymentRecord[];
  setPayments: (p: PaymentRecord[]) => void;
  transactions: Transaction[];
  setTransactions: (t: Transaction[]) => void;
  walletBalance: number;
  setWalletBalance: (b: number) => void;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  profile, setProfile, invoices, setInvoices, clients, setClients, 
  payments, setPayments, transactions, setTransactions, 
  walletBalance, setWalletBalance, onLogout 
}) => {
  const [activeTab, setActiveTab] = useState('HOME');
  const [activeInvoiceFilter, setActiveInvoiceFilter] = useState('ALL');
  const [showNewInvoice, setShowNewInvoice] = useState(false);
  const [showAddClient, setShowAddClient] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);

  // Tempo blockchain integration
  const { balance, isLoading: balanceLoading } = useBalance();
  const { wallets } = useWallets();

  // Derived Stats
  const stats = {
    outstanding: invoices.filter(i => i.status !== 'PAID').reduce((acc, curr) => acc + curr.amount, 0),
    paidThisMonth: payments.reduce((acc, curr) => acc + curr.amount, 0),
    totalClients: clients.length,
    walletBalance: parseFloat(balance) || walletBalance
  };

  const handleAddInvoice = (newInvoiceData: any) => {
    const newInvoice: Invoice = {
      id: Math.random().toString(36).substr(2, 9),
      clientName: newInvoiceData.client,
      invoiceId: `INV-${(invoices.length + 1).toString().padStart(4, '0')}`,
      amount: newInvoiceData.total,
      status: 'SENT',
      dueDate: newInvoiceData.dueDate || new Date().toLocaleDateString(),
      itemDescription: newInvoiceData.description
    };
    setInvoices([newInvoice, ...invoices]);
    setShowNewInvoice(false);
    setActiveTab('INVOICES'); 
  };

  const handleAddNewClient = (clientData: any) => {
    const newClient: Client = {
      id: Math.random().toString(36).substr(2, 9),
      name: clientData.name,
      email: clientData.email,
      totalPaid: 0,
      color: 'bg-[#00E5FF]',
      avatarUrl: clientData.avatarUrl
    };
    setClients([newClient, ...clients]);
    setShowAddClient(false);
  };

  const handleMarkAsPaid = (id: string) => {
    const invoice = invoices.find(inv => inv.id === id);
    if (!invoice) return;

    // 1. Update Invoices
    setInvoices(invoices.map(inv => inv.id === id ? { ...inv, status: 'PAID' } : inv));
    
    // 2. Add to Payments
    const newPayment: PaymentRecord = {
      id: Math.random().toString(36).substr(2, 9),
      clientName: invoice.clientName,
      invoiceId: invoice.invoiceId,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      amount: invoice.amount,
      status: 'PAID'
    };
    setPayments([newPayment, ...payments]);

    // 3. Add to Transactions
    const newTx: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      title: `Payment for ${invoice.invoiceId}`,
      subtitle: 'Invoice Payment',
      amount: invoice.amount,
      date: new Date().toLocaleDateString(),
      type: 'INCOME',
      iconType: 'INVOICE'
    };
    setTransactions([newTx, ...transactions]);

    // 4. Update Wallet
    setWalletBalance(walletBalance + invoice.amount);

    // 5. Update Client stats
    setClients(clients.map(c => c.name === invoice.clientName ? { ...c, totalPaid: c.totalPaid + invoice.amount } : c));

    setSelectedInvoiceId(null);
  };

  const handleDeleteInvoice = (id: string) => {
    setInvoices(invoices.filter(inv => inv.id !== id));
    setSelectedInvoiceId(null);
  };

  const handleFabClick = () => {
    if (activeTab === 'CLIENTS') {
      setShowAddClient(true);
    } else {
      setShowNewInvoice(true);
    }
  };

  if (showSettings) {
    return (
      <Settings 
        profile={profile}
        setProfile={setProfile}
        onBack={() => setShowSettings(false)} 
        onLogout={onLogout} 
      />
    );
  }

  if (selectedInvoiceId) {
    const invoice = invoices.find(i => i.id === selectedInvoiceId);
    if (invoice) {
      return (
        <InvoiceDetails 
          invoice={invoice} 
          onBack={() => setSelectedInvoiceId(null)} 
          onMarkAsPaid={handleMarkAsPaid}
          onDelete={handleDeleteInvoice}
        />
      );
    }
  }

  if (showNewInvoice) {
    return <NewInvoice clients={clients} onBack={() => setShowNewInvoice(false)} onSend={handleAddInvoice} />;
  }

  if (showAddClient) {
    return <AddClient onBack={() => setShowAddClient(false)} onAdd={handleAddNewClient} />;
  }

  const renderHome = () => (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="bg-[#DFDF8E] rounded-[24px] p-6 text-black flex flex-col justify-between h-40 shadow-xl">
        <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-[11px] opacity-70">
          <TrendingUp className="w-4 h-4" />
          OUTSTANDING
        </div>
        <div className="text-4xl font-bold tracking-tighter">
          ${stats.outstanding.toLocaleString()}
        </div>
      </div>

      <div className="bg-[#D8B4FE] rounded-[24px] p-6 text-black flex flex-col justify-between h-40 shadow-xl">
        <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-[11px] opacity-70">
          <DollarSign className="w-4 h-4" />
          PAID THIS MONTH
        </div>
        <div className="text-4xl font-bold tracking-tighter">
          ${stats.paidThisMonth.toLocaleString()}
        </div>
      </div>

      <div className="bg-[#00E5FF] rounded-[24px] p-6 text-black flex flex-col justify-between h-40 shadow-xl">
        <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-[11px] opacity-70">
          <Users className="w-4 h-4" />
          TOTAL CLIENTS
        </div>
        <div className="text-4xl font-bold tracking-tighter">
          {stats.totalClients}
        </div>
      </div>

      <section className="pt-4">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4 px-1">
          RECENT INVOICES
        </h2>
        {invoices.length === 0 ? (
          <div className="bg-[#121212] p-8 rounded-[24px] text-center border border-dashed border-gray-800">
             <p className="text-gray-600 font-medium">No invoices yet. Tap + to start.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {invoices.slice(0, 3).map((invoice) => (
              <div 
                key={invoice.id}
                onClick={() => setSelectedInvoiceId(invoice.id)}
                className="bg-[#121212] p-5 rounded-[20px] flex justify-between items-center group active:scale-[0.98] transition-all cursor-pointer border border-transparent hover:border-gray-800"
              >
                <div>
                  <h3 className="font-semibold text-[17px]">{invoice.clientName}</h3>
                  <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">{invoice.invoiceId}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold tracking-tight">${invoice.amount.toLocaleString()}</div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter mt-1 inline-block ${
                    invoice.status === 'PAID' ? 'bg-purple-900/30 text-purple-400' : 'bg-yellow-900/30 text-yellow-500'
                  }`}>
                    {invoice.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );

  const renderClients = () => (
    <div className="space-y-4 animate-in slide-in-from-right duration-300">
      {clients.length === 0 ? (
        <div className="bg-[#121212] p-12 rounded-[32px] text-center border-2 border-dashed border-gray-800 flex flex-col items-center">
           <Users className="w-12 h-12 text-gray-800 mb-4" />
           <p className="text-gray-600 font-bold uppercase tracking-widest text-xs">Build your client list</p>
        </div>
      ) : (
        <div className="space-y-6">
          {clients.map((client) => (
            <div key={client.id} className="bg-[#121212] p-4 rounded-[20px] flex justify-between items-center border border-transparent hover:border-gray-800 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                {client.avatarUrl ? (
                  <img src={client.avatarUrl} alt={client.name} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-black font-bold text-sm ${client.color}`}>
                    {client.name.split(' ').map(n => n[0]).join('')}
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-[17px] text-white">{client.name}</h3>
                  <p className="text-gray-600 text-xs font-medium">{client.email}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-white">${client.totalPaid.toLocaleString()}</div>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Total Paid</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderInvoices = () => {
    const filters = ['ALL', 'SENT', 'PAID'];
    const filteredInvoices = activeInvoiceFilter === 'ALL' 
      ? invoices 
      : invoices.filter(inv => inv.status === activeInvoiceFilter);

    return (
      <div className="space-y-6 animate-in slide-in-from-right duration-300">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveInvoiceFilter(filter)}
              className={`px-5 py-2.5 rounded-full text-[11px] font-bold tracking-widest transition-all whitespace-nowrap ${
                activeInvoiceFilter === filter 
                ? 'bg-[#00E5FF] text-black shadow-lg shadow-cyan-500/20' 
                : 'bg-[#121212] text-gray-500 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {filteredInvoices.length === 0 ? (
          <div className="text-center py-20 opacity-20 flex flex-col items-center">
            <FileText className="w-16 h-16 mb-4" />
            <p className="font-black uppercase tracking-widest text-xs">No invoices found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredInvoices.map((invoice) => (
              <div key={invoice.id} className="bg-[#121212] rounded-[24px] p-6 border border-gray-900 hover:border-gray-800 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold tracking-tighter mb-1 uppercase">{invoice.invoiceId}</h3>
                    <p className="text-gray-400 font-semibold">{invoice.clientName}</p>
                    <p className="text-gray-600 text-xs mt-1">Due: {invoice.dueDate}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black">${invoice.amount.toLocaleString()}</div>
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded uppercase tracking-tighter mt-2 inline-block ${
                      invoice.status === 'PAID' ? 'bg-purple-900/30 text-purple-400' : 'bg-cyan-900/30 text-cyan-400'
                    }`}>
                      {invoice.status}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setSelectedInvoiceId(invoice.id)} className="flex-1 bg-[#1A1A1A] text-white py-4 rounded-2xl font-bold text-[11px] uppercase tracking-widest hover:bg-gray-800 transition-colors">
                    VIEW DETAILS
                  </button>
                  <button onClick={() => handleDeleteInvoice(invoice.id)} className="w-14 bg-pink-900/20 text-pink-500 flex items-center justify-center rounded-2xl hover:bg-pink-900/40 transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderPayments = () => (
    <div className="space-y-6 animate-in slide-in-from-right duration-300">
      {payments.length === 0 ? (
        <div className="text-center py-20 opacity-20">
          <CreditCard className="w-16 h-16 mx-auto mb-4" />
          <p className="font-black uppercase tracking-widest text-xs">Awaiting first payment</p>
        </div>
      ) : (
        <div className="space-y-4">
          {payments.map((payment) => (
            <div key={payment.id} className="bg-[#121212] rounded-[24px] p-6 border border-gray-900 flex justify-between items-start hover:border-gray-800 transition-colors">
              <div className="space-y-1.5">
                <h3 className="text-xl font-bold tracking-tight text-white">{payment.clientName}</h3>
                <p className="text-gray-600 text-[11px] font-bold tracking-widest">{payment.invoiceId}</p>
                <p className="text-gray-500 text-sm mt-3">{payment.date}</p>
              </div>
              <div className="text-right">
                <span className="bg-purple-900/30 text-purple-400 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">PAID</span>
                <div className="mt-8">
                  <span className="text-2xl font-black text-white">${payment.amount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderWallet = () => (
    <div className="space-y-8 animate-in slide-in-from-right duration-300">
      <div className="bg-[#00E5FF] rounded-[32px] p-8 text-black shadow-2xl shadow-cyan-500/20">
        <label className="text-black/50 text-[11px] font-bold tracking-[0.2em] uppercase mb-4 block">CURRENT BALANCE</label>
        <div className="text-5xl font-black tracking-tighter mb-10">${stats.walletBalance.toLocaleString()}</div>
        <div className="flex gap-4">
          <button className="flex-1 bg-black text-white py-4 rounded-full font-black text-[11px] uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all">WITHDRAW</button>
          <button className="flex-1 bg-white text-black py-4 rounded-full font-black text-[11px] uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all">ADD FUNDS</button>
        </div>
      </div>

      <section className="space-y-6">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 px-1">RECENT TRANSACTIONS</h2>
        <div className="space-y-4">
          {transactions.length === 0 ? (
            <div className="text-center py-10 opacity-20 border border-dashed border-gray-800 rounded-[24px]">
               <ClipboardList className="w-10 h-10 mx-auto mb-2" />
               <p className="text-[10px] font-bold uppercase">No history yet</p>
            </div>
          ) : (
            transactions.map((tx) => (
              <div key={tx.id} className="bg-[#121212] p-5 rounded-[24px] flex items-center justify-between border border-transparent hover:border-gray-800 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-[18px] flex items-center justify-center ${
                    tx.iconType === 'INVOICE' ? 'bg-[#1A1A1A] text-purple-400' :
                    tx.iconType === 'WITHDRAWAL' ? 'bg-[#2D0A14] text-pink-500' : 'bg-[#1A1A1A] text-gray-400'
                  }`}>
                    {tx.iconType === 'INVOICE' ? <FileText className="w-5 h-5" /> :
                     tx.iconType === 'WITHDRAWAL' ? <ArrowDownToLine className="w-5 h-5" /> : <ClipboardList className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-[15px] text-white line-clamp-1">{tx.title}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-gray-600 text-[11px] font-bold uppercase tracking-wider">{tx.subtitle}</span>
                      <span className="text-gray-800">•</span>
                      <span className="text-gray-600 text-[11px] font-bold uppercase tracking-wider">{tx.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[17px] font-black ${tx.type === 'EXPENSE' ? 'text-pink-500' : 'text-white'}`}>
                    {tx.type === 'INCOME' ? '+' : '-'}${tx.amount.toLocaleString()}
                  </span>
                  {tx.type === 'INCOME' ? <ArrowUpRight className="w-4 h-4 text-gray-700" /> : <ArrowDownRight className="w-4 h-4 text-pink-900" />}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col max-w-[500px] mx-auto relative">
      <header className="p-6 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{activeTab === 'HOME' ? 'Dashboard' : activeTab.charAt(0) + activeTab.slice(1).toLowerCase()}</h1>
          <p className="text-gray-500 text-sm mt-1">{activeTab === 'HOME' ? 'Track your business' : `Manage your ${activeTab.toLowerCase()}`}</p>
        </div>
        <button onClick={() => setShowSettings(true)} className="bg-[#1A1A1A] p-3 rounded-full hover:bg-gray-800 transition-colors">
          <SettingsIcon className="w-6 h-6 text-gray-400" />
        </button>
      </header>
      <main className="flex-1 overflow-y-auto px-6 pb-32 no-scrollbar">
        {activeTab === 'HOME' ? renderHome() : activeTab === 'CLIENTS' ? renderClients() : activeTab === 'INVOICES' ? renderInvoices() : activeTab === 'PAYMENTS' ? renderPayments() : renderWallet()}
      </main>
      {activeTab !== 'PAYMENTS' && activeTab !== 'WALLET' && (
        <button onClick={handleFabClick} className="fixed bottom-28 right-8 w-14 h-14 bg-[#00E5FF] rounded-full flex items-center justify-center text-black shadow-2xl shadow-cyan-400/30 hover:scale-110 active:scale-90 transition-all z-20">
          <Plus className="w-8 h-8 stroke-[3]" />
        </button>
      )}
      <nav className="fixed bottom-0 left-0 right-0 max-w-[500px] mx-auto bg-[#000000]/90 backdrop-blur-md border-t border-gray-900 px-6 py-4 flex justify-between items-center z-10">
        <NavButton label="HOME" icon={<Home className="w-5 h-5" />} active={activeTab === 'HOME'} onClick={() => setActiveTab('HOME')} />
        <NavButton label="CLIENTS" icon={<Users className="w-5 h-5" />} active={activeTab === 'CLIENTS'} onClick={() => setActiveTab('CLIENTS')} />
        <NavButton label="INVOICES" icon={<FileText className="w-5 h-5" />} active={activeTab === 'INVOICES'} onClick={() => setActiveTab('INVOICES')} />
        <NavButton label="PAYMENTS" icon={<CreditCard className="w-5 h-5" />} active={activeTab === 'PAYMENTS'} onClick={() => setActiveTab('PAYMENTS')} />
        <NavButton label="WALLET" icon={<Wallet className="w-5 h-5" />} active={activeTab === 'WALLET'} onClick={() => setActiveTab('WALLET')} />
      </nav>
    </div>
  );
};

const NavButton: React.FC<{ label: string; icon: React.ReactNode; active: boolean; onClick: () => void }> = ({ label, icon, active, onClick }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 group transition-colors ${active ? 'text-[#00E5FF]' : 'text-gray-600'}`}>
    <div className={`transition-transform duration-200 ${active ? 'scale-110' : 'group-hover:scale-105'}`}>{icon}</div>
    <span className="text-[9px] font-bold tracking-widest">{label}</span>
  </button>
);
