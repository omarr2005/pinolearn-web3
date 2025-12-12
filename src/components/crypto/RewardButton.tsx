'use client';

import { useState } from 'react';
import { ethers } from 'ethers';

const TOKEN_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function balanceOf(address) view returns (uint256)',
  'function rewardUser(address user, uint256 amount, string reason) public',
];

interface RewardButtonProps {
  userWallet: string;
  userName?: string;
}

export function RewardButton({ userWallet, userName }: RewardButtonProps) {
  const [sending, setSending] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [error, setError] = useState('');

  async function sendReward() {
    setSending(true);
    setTxHash('');
    setError('');

    try {
      console.log('========================================');
      console.log('🚀 REWARD TRANSACTION STARTED');
      console.log('========================================');

      // Log environment variables
      console.log('📋 ENV VARIABLES CHECK:');
      console.log('  TOKEN_ADDRESS:', process.env.NEXT_PUBLIC_PINO_TOKEN_ADDRESS);
      console.log('  CHAIN_ID:', process.env.NEXT_PUBLIC_CHAIN_ID);
      console.log('  RPC_URL:', process.env.NEXT_PUBLIC_RPC_URL);

      // Alert to user
      alert(
        `🔍 Debug Info:\n\nToken: ${process.env.NEXT_PUBLIC_PINO_TOKEN_ADDRESS || 'NOT SET'}\nChain: ${process.env.NEXT_PUBLIC_CHAIN_ID || 'NOT SET'}\nRPC: ${process.env.NEXT_PUBLIC_RPC_URL || 'NOT SET'}`
      );

      if (!window.ethereum) {
        throw new Error('MetaMask not installed');
      }
      console.log('✅ MetaMask detected');

      const tokenAddress = process.env.NEXT_PUBLIC_PINO_TOKEN_ADDRESS;
      if (!tokenAddress) {
        console.error('❌ TOKEN ADDRESS NOT CONFIGURED!');
        throw new Error(
          'Token contract address not configured. Add NEXT_PUBLIC_PINO_TOKEN_ADDRESS to .env.local'
        );
      }
      console.log('✅ Token address OK:', tokenAddress);

      console.log('💰 Initiating reward...');
      console.log('📍 Token contract:', tokenAddress);
      console.log('👤 Recipient:', userWallet);

      console.log('🔌 Creating Web3 Provider...');
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log('✅ Provider created');

      // Check current network
      console.log('🌐 Checking current network...');
      const network = await provider.getNetwork();
      console.log('📊 Network details:', {
        chainId: network.chainId,
        name: network.name,
      });

      const requiredChainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '80002');
      console.log('🎯 Required chain ID:', requiredChainId);
      console.log('🌐 Current chain ID:', network.chainId);
      console.log('❓ Match?', network.chainId === requiredChainId);

      // Alert actual vs expected
      alert(
        `🌐 Network Check:\n\nCurrent: ${network.chainId} (${network.name})\nRequired: ${requiredChainId} (Polygon Amoy)\nMatch: ${network.chainId === requiredChainId ? 'YES ✅' : 'NO ❌'}`
      );

      // Switch to Polygon Amoy if not already on it
      if (network.chainId !== requiredChainId) {
        console.log('⚠️ WRONG NETWORK DETECTED!');
        console.log('🔄 Attempting to switch to Polygon Amoy...');

        const chainIdHex = `0x${requiredChainId.toString(16)}`;
        console.log('🔢 Chain ID (hex):', chainIdHex);

        try {
          console.log('📡 Requesting network switch...');
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: chainIdHex }],
          });
          console.log('✅ Successfully switched to Polygon Amoy!');
          alert('✅ Switched to Polygon Amoy! Please confirm transaction.');
        } catch (switchError: any) {
          console.error('❌ Switch error:', switchError);
          console.log('Error code:', switchError.code);

          // Chain not added, try to add it
          if (switchError.code === 4902) {
            console.log('📍 Chain not found. Adding Polygon Amoy network...');
            try {
              const rpcUrl =
                process.env.NEXT_PUBLIC_RPC_URL || 'https://rpc-amoy.polygon.technology';
              console.log('🌐 RPC URL:', rpcUrl);

              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: chainIdHex,
                    chainName: 'Polygon Amoy',
                    nativeCurrency: {
                      name: 'POL',
                      symbol: 'POL',
                      decimals: 18,
                    },
                    rpcUrls: [rpcUrl],
                    blockExplorerUrls: ['https://amoy.polygonscan.com'],
                  },
                ],
              });
              console.log('✅ Network added and switched!');
              alert('✅ Polygon Amoy added! Please confirm transaction.');
            } catch (addError) {
              console.error('❌ Failed to add network:', addError);
              throw new Error(
                'Failed to add Polygon Amoy network. Please add it manually in MetaMask.'
              );
            }
          } else {
            console.error('❌ Cannot switch network. Code:', switchError.code);
            throw new Error('Please switch to Polygon Amoy network in MetaMask');
          }
        }
      } else {
        console.log('✅ Already on correct network (Polygon Amoy)');
      }

      // IMPORTANT: Create fresh provider AFTER network switch
      // If we use the old provider, ethers will detect network change and throw NETWORK_ERROR
      console.log('🔄 Creating fresh provider after network check...');
      const freshProvider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = freshProvider.getSigner();
      console.log('✅ Fresh provider created');

      console.log('📝 Creating contract instance...');
      const contract = new ethers.Contract(tokenAddress, TOKEN_ABI, signer);
      console.log('✅ Contract instance created');

      // Send 10 tokens = 10 * 10^18
      const amount = ethers.utils.parseEther('10');
      console.log('💰 Amount to send:', amount.toString(), '(10 PINO)');

      console.log('⏳ Sending transaction...');
      console.log('📍 Contract:', tokenAddress);
      console.log('👤 Recipient:', userWallet);
      console.log('💎 Amount:', '10 PINO');

      const tx = await contract.rewardUser(userWallet, amount, 'Test_Reward_Grant_Demo');

      console.log('✅ Transaction sent:', tx.hash);
      setTxHash(tx.hash);

      // Wait for confirmation
      console.log('⏳ Waiting for confirmation...');
      const receipt = await tx.wait();

      console.log('✅ Transaction confirmed!', receipt);
      alert(`✅ Success! Sent 10 PINO tokens!\n\nTX Hash: ${tx.hash.slice(0, 20)}...`);
    } catch (err: any) {
      console.error('❌ Reward error:', err);
      const errorMsg = err.message || 'Failed to send reward';
      setError(errorMsg);
      alert(`❌ Error: ${errorMsg}`);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="p-6 border-2 border-purple-200 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50">
      <h4 className="text-xl font-bold mb-3 text-gray-800">💎 Send Token Reward</h4>

      <div className="mb-4 p-3 bg-white rounded border">
        <div className="text-sm text-gray-600 mb-1">Recipient:</div>
        <div className="font-mono text-sm font-semibold text-gray-800">
          {userWallet.slice(0, 10)}...{userWallet.slice(-8)}
        </div>
        {userName && <div className="text-sm text-gray-500 mt-1">({userName})</div>}
      </div>

      <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
        <div className="text-sm">
          <strong>Reward Amount:</strong> 10 PINO tokens
        </div>
        <div className="text-xs text-gray-600 mt-1">For completing test activity</div>
      </div>

      <button
        onClick={sendReward}
        disabled={sending}
        className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
      >
        {sending ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin">⚡</span>
            Sending Transaction...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">💸 Send 10 PINO Tokens</span>
        )}
      </button>

      {txHash && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 rounded">
          <div className="text-sm font-semibold text-green-800 mb-2">✅ Transaction Sent!</div>
          <a
            href={`https://amoy.polygonscan.com/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm break-all"
          >
            View on PolygonScan →
          </a>
          <div className="text-xs text-gray-600 mt-2 font-mono break-all">{txHash}</div>
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

declare global {
  interface Window {
    ethereum?: any;
  }
}
