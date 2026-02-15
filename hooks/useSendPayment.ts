import { useState } from 'react'
import { useWallets } from '@privy-io/react-auth'
import { createWalletClient, custom, parseUnits, stringToHex, pad, type Address } from 'viem'
import { tempoModerato, DEFAULT_TOKEN, TIP20_ABI } from '../config/tempo'

export function useSendPayment() {
  const { wallets } = useWallets()
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [txHash, setTxHash] = useState<string | null>(null)

  const sendPayment = async (
    to: Address,
    amount: string,
    memo: string = ''
  ) => {
    if (isSending) return
    setIsSending(true)
    setError(null)
    setTxHash(null)

    const wallet = wallets[0]
    if (!wallet?.address) {
      const errMsg = 'No active wallet'
      setError(errMsg)
      setIsSending(false)
      throw new Error(errMsg)
    }

    try {
      const provider = await wallet.getEthereumProvider()
      const client = createWalletClient({
        account: wallet.address as Address,
        chain: tempoModerato,
        transport: custom(provider),
      })

      // Convert amount to proper decimals (6 for stablecoins)
      const amountInWei = parseUnits(amount, 6)
      
      // Create memo bytes32
      const memoBytes = memo ? pad(stringToHex(memo), { size: 32 }) : pad('0x', { size: 32 })

      // Send transaction with memo
      const hash = await client.writeContract({
        address: DEFAULT_TOKEN,
        abi: TIP20_ABI,
        functionName: 'transferWithMemo',
        args: [to, amountInWei, memoBytes],
      })

      setTxHash(hash)
      return hash
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to send payment'
      setError(errorMessage)
      throw err
    } finally {
      setIsSending(false)
    }
  }

  return {
    sendPayment,
    isSending,
    error,
    txHash,
    reset: () => {
      setError(null)
      setTxHash(null)
    },
  }
}
