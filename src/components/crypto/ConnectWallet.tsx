'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';

export function ConnectWallet() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [connecting, setConnecting] = useState(false);
  const [wallet, setWallet] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  async function handleConnect() {
    setConnecting(true);
    setError('');

    try {
      // Check if user is signed in
      if (!isSignedIn) {
        throw new Error('Please sign in to PinoLearn first before connecting your wallet');
      }

      // Check MetaMask
      if (!window.ethereum) {
        throw new Error('Please install MetaMask from https://metamask.io');
      }

      console.log('🔌 Requesting account access...');

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const address = accounts[0];
      console.log('✅ Wallet connected:', address);

      // Save to database
      console.log('💾 Saving to database...');
      const response = await fetch('/api/user/connect-wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress: address }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ API Error:', errorData);
        throw new Error(errorData.error || 'Failed to save wallet to database');
      }

      const data = await response.json();
      console.log('✅ Saved to database:', data);

      setWallet(address);
      alert(
        `✅ Wallet Connected Successfully!\n\nAddress: ${address.slice(0, 10)}...${address.slice(-8)}\n\nRefreshing page...`
      );

      // Reload to show updated wallet
      window.location.reload();
    } catch (err: any) {
      console.error('❌ Connection error:', err);
      setError(err.message);
      alert(`❌ Error: ${err.message}`);
    } finally {
      setConnecting(false);
    }
  }

  return (
    <div className="p-6 border-2 border-blue-200 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50">
      <h3 className="text-xl font-bold mb-3 text-gray-800">🔐 Connect Crypto Wallet</h3>
      <p className="text-sm text-gray-600 mb-4">
        Connect your MetaMask wallet to receive PINO token rewards for learning!
      </p>

      {!isLoaded ? (
        <div className="text-center py-4">
          <div className="animate-spin text-4xl">⚡</div>
          <p className="text-sm text-gray-600 mt-2">Loading...</p>
        </div>
      ) : !isSignedIn ? (
        <div className="p-4 bg-yellow-50 border-2 border-yellow-400 rounded-lg">
          <div className="text-yellow-800 font-semibold mb-2">⚠️ Please Sign In First</div>
          <p className="text-sm text-yellow-700 mb-3">
            You need to be signed in to PinoLearn to connect your wallet
          </p>
          <a
            href="/sign-in"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Sign In to Continue
          </a>
        </div>
      ) : !wallet ? (
        <button
          onClick={handleConnect}
          disabled={connecting}
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
        >
          {connecting ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">⚡</span>
              Connecting...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              🦊 Connect MetaMask Wallet
            </span>
          )}
        </button>
      ) : (
        <div className="p-4 bg-green-100 border-2 border-green-400 rounded-lg">
          <div className="flex items-center gap-2 text-green-800 font-semibold">
            ✅ Wallet Connected
          </div>
          <div className="text-sm text-green-700 mt-1 font-mono">
            {wallet.slice(0, 8)}...{wallet.slice(-6)}
          </div>
        </div>
      )}

      {error && (
        <div className="mt-3 p-3 bg-red-100 border border-red-400 rounded text-red-700 text-sm">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
}

// Type declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}
