import { createConfig, http } from '@wagmi/core'
import { createClient } from 'viem'
import { defineChain } from 'viem/utils'

// Tempo Testnet (Moderato) Chain
export const tempoModerato = defineChain({
  id: 42431,
  name: 'Tempo Testnet',
  nativeCurrency: { name: 'USD', symbol: 'USD', decimals: 6 },
  rpcUrls: {
    default: { http: ['https://rpc.moderato.tempo.xyz'] },
  },
  blockExplorers: {
    default: { name: 'Tempo Explorer', url: 'https://explore.tempo.xyz' },
  },
  testnet: true,
})

// Tempo Stablecoin Addresses
export const TOKENS = {
  alphaUsd: '0x20c0000000000000000000000000000000000001' as const,
  betaUsd: '0x20c0000000000000000000000000000000000002' as const,
  pathUsd: '0x20c0000000000000000000000000000000000000' as const,
}

// Default token for payments
export const DEFAULT_TOKEN = TOKENS.alphaUsd

// Wagmi config
export const config = createConfig({
  chains: [tempoModerato],
  transports: {
    [tempoModerato.id]: http(),
  },
})

// TIP-20 Token ABI (minimal for transfers)
export const TIP20_ABI = [
  {
    type: 'function',
    name: 'transfer',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'transferWithMemo',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'memo', type: 'bytes32' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'balanceOf',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'decimals',
    inputs: [],
    outputs: [{ type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    name: 'TransferWithMemo',
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'value', type: 'uint256' },
      { name: 'memo', type: 'bytes32', indexed: true },
    ],
  },
] as const
