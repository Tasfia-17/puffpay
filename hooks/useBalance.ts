import { useWallets } from '@privy-io/react-auth'
import { createPublicClient, http, formatUnits, type Address } from 'viem'
import { tempoModerato, DEFAULT_TOKEN, TIP20_ABI } from '../config/tempo'
import { useEffect, useState } from 'react'

export function useBalance() {
  const { wallets } = useWallets()
  const [balance, setBalance] = useState<string>('0')
  const [isLoading, setIsLoading] = useState(false)

  const fetchBalance = async () => {
    const wallet = wallets[0]
    if (!wallet?.address) return

    setIsLoading(true)
    try {
      const client = createPublicClient({
        chain: tempoModerato,
        transport: http(),
      })

      const balanceWei = await client.readContract({
        address: DEFAULT_TOKEN,
        abi: TIP20_ABI,
        functionName: 'balanceOf',
        args: [wallet.address as Address],
      })

      setBalance(formatUnits(balanceWei as bigint, 6))
    } catch (err) {
      console.error('Failed to fetch balance:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchBalance()
    const interval = setInterval(fetchBalance, 10000) // Refresh every 10s
    return () => clearInterval(interval)
  }, [wallets])

  return { balance, isLoading, refetch: fetchBalance }
}
