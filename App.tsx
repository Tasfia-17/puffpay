
import React, { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { Logo } from './components/Logo';
import { Dashboard } from './components/Dashboard';
import { Onboarding } from './components/Onboarding';

export interface Invoice {
  id: string;
  clientName: string;
  invoiceId: string;
  amount: number;
  status: 'PAID' | 'PENDING' | 'DRAFT' | 'SENT' | 'OVERDUE';
  dueDate: string;
  itemDescription?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  totalPaid: number;
  dueAmount?: number;
  avatarUrl?: string;
  color: string;
}

export interface PaymentRecord {
  id: string;
  clientName: string;
  invoiceId: string;
  date: string;
  amount: number;
  status: 'PAID';
}

export interface Transaction {
  id: string;
  title: string;
  subtitle: string;
  amount: number;
  date: string;
  type: 'INCOME' | 'EXPENSE';
  iconType: 'INVOICE' | 'WITHDRAWAL' | 'DEPOSIT';
}

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  
  // Application Data State - Initialized as empty
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [walletBalance, setWalletBalance] = useState(0);

  const handleLoginSuccess = (userEmail: string) => {
    setProfile({ name: 'New User', email: userEmail });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Optional: clear state on logout if required
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  if (isLoggedIn) {
    return (
      <Dashboard 
        profile={profile}
        setProfile={setProfile}
        invoices={invoices}
        setInvoices={setInvoices}
        clients={clients}
        setClients={setClients}
        payments={payments}
        setPayments={setPayments}
        transactions={transactions}
        setTransactions={setTransactions}
        walletBalance={walletBalance}
        setWalletBalance={setWalletBalance}
        onLogout={handleLogout} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 sm:p-0 animate-in fade-in duration-500">
      <div className="w-full max-w-[400px] flex flex-col">
        <div className="mb-10 text-left">
          <Logo />
          <p className="text-gray-400 text-[15px] mt-2 font-medium">
            Sign in to your happy place
          </p>
        </div>
        <LoginForm onLoginSuccess={handleLoginSuccess} />
        <div className="mt-12 text-center">
          <p className="text-purple-400 text-sm font-bold tracking-wide cursor-pointer hover:text-purple-300 transition-colors">
            Don't have an account? <span className="underline underline-offset-4">Join PuffPay</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
