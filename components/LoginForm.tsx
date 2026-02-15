import React from 'react';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { Wallet } from 'lucide-react';

interface LoginFormProps {
  onLoginSuccess: (email: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const { login, authenticated, user } = usePrivy();
  const { wallets } = useWallets();

  React.useEffect(() => {
    if (authenticated && user?.email) {
      onLoginSuccess(user.email.address);
    }
  }, [authenticated, user]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <button
          onClick={login}
          disabled={authenticated}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 disabled:from-gray-600 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 shadow-lg shadow-purple-500/30 hover:shadow-purple-400/40 disabled:shadow-none flex items-center justify-center gap-3"
        >
          <Wallet className="h-5 w-5" />
          {authenticated ? 'Connected' : 'Connect Wallet & Sign In'}
        </button>

        {authenticated && wallets[0] && (
          <div className="bg-[#121212] border-2 border-purple-500/30 rounded-2xl p-4">
            <p className="text-gray-400 text-xs mb-1">Connected Wallet</p>
            <p className="text-white text-sm font-mono">
              {wallets[0].address.slice(0, 6)}...{wallets[0].address.slice(-4)}
            </p>
            {user?.email && (
              <p className="text-purple-400 text-xs mt-2">{user.email.address}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
