# PuffPay - Tempo Blockchain Invoice Platform

A modern invoice management system built with React, TypeScript, and **Tempo blockchain**. PuffPay enables instant stablecoin payments for freelancers and small businesses with blockchain-verified transactions.

## Tempo Hackathon Submission

**Track:** Consumer Payments & Social Finance  
**Blockchain:** Tempo Testnet (Moderato)  
**Chain ID:** 42431

## Key Features

### Blockchain-Powered Payments
- **Instant Settlement** - Payments confirmed in seconds on Tempo blockchain
- **Stablecoin Native** - All payments in AlphaUSD (no volatility)
- **Transaction Memos** - Invoice IDs embedded in blockchain for reconciliation
- **Wallet Integration** - Privy authentication with embedded wallets
- **Gasless UX** - Pay fees in stablecoins, no native tokens needed

### Invoice Management
- Create and send invoices with wallet addresses
- Track invoice status (paid, pending, overdue)
- Blockchain-verified payment proof
- Transaction history with explorer links

### User Experience
- **Email/Wallet Login** - Privy authentication (no seed phrases)
- **Real-time Balance** - Live AlphaUSD balance display
- **Payment Links** - Share invoices with clients
- **Transaction Explorer** - View all payments on Tempo Explorer

## Tempo Features Used

| Feature | Implementation |
|---------|---------------|
| **Transfer with Memos** | Invoice IDs stored in 32-byte transaction memos |
| **Privy Integration** | Email/wallet authentication with embedded wallets |
| **TIP-20 Tokens** | AlphaUSD stablecoin for all payments |
| **Instant Finality** | No confirmation waiting - instant payment status |
| **Fee Sponsorship** | Optional gasless transactions for users |

## Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Blockchain**: Tempo (Layer 1)
- **Wallet**: Privy (embedded wallets)
- **Web3 Library**: Viem 2.21+
- **UI Icons**: Lucide React

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Privy account (for authentication)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Tasfia-17/puffpay.git
cd puffpay
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (`.env.local`):
```env
VITE_PRIVY_APP_ID=your_privy_app_id
VITE_TEMPO_RPC=https://rpc.moderato.tempo.xyz
VITE_TEMPO_CHAIN_ID=42431
```

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## How It Works

### For Invoice Creators:
1. **Login** - Connect wallet via Privy (email or wallet)
2. **Create Invoice** - Add client details and wallet address
3. **Send Invoice** - Share with client
4. **Get Paid** - Receive instant stablecoin payment
5. **Verify** - Check transaction on Tempo Explorer

### For Payers:
1. **Receive Invoice** - Get invoice with payment details
2. **Connect Wallet** - Login with Privy
3. **Pay Invoice** - One-click payment with AlphaUSD
4. **Confirmation** - Instant blockchain confirmation

## Tempo Network Details

- **Network**: Tempo Testnet (Moderato)
- **Chain ID**: 42431
- **RPC**: https://rpc.moderato.tempo.xyz
- **Explorer**: https://explore.tempo.xyz
- **Token**: AlphaUSD (`0x20c0000000000000000000000000000000000001`)

## Configuration

### Tempo Blockchain
The app uses Tempo's testnet with the following configuration:
- Instant finality (no block confirmations needed)
- Stablecoin-native (USD denominated)
- Low fees paid in stablecoins

### Privy Authentication
- Email/social login
- Embedded wallet creation
- No seed phrase management
- Multi-chain support

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure

```
puffpay/
├── components/
│   ├── LoginForm.tsx       # Privy authentication
│   ├── Dashboard.tsx       # Main dashboard with balance
│   ├── NewInvoice.tsx      # Invoice creation with wallet input
│   ├── InvoiceDetails.tsx  # Payment processing
│   ├── AddClient.tsx       # Client management
│   ├── Settings.tsx        # User settings
│   ├── Onboarding.tsx      # First-time setup
│   └── Logo.tsx            # Brand logo
├── hooks/
│   ├── useSendPayment.ts   # Tempo payment hook
│   └── useBalance.ts       # Balance fetching hook
├── config/
│   └── tempo.ts            # Tempo chain config & ABIs
├── App.tsx                 # Main app with Privy provider
└── index.tsx               # React entry point
```

## Key Components

### Payment Flow
1. **NewInvoice** - Captures client wallet address
2. **InvoiceDetails** - Processes payment via Tempo
3. **useSendPayment** - Handles blockchain transaction
4. **Transaction Memo** - Embeds invoice ID for reconciliation

### Blockchain Integration
- **Viem** - Ethereum-compatible client for Tempo
- **TIP-20** - Tempo's token standard (ERC-20 compatible)
- **Transfer with Memo** - Custom function for invoice tracking

## Demo Workflow

1. **Create Account**: Login with email via Privy
2. **Add Client**: Enter client name and Tempo wallet address
3. **Create Invoice**: 
   - Select client
   - Enter amount and description
   - Add client's wallet address
4. **Send Invoice**: Invoice created with unique ID
5. **Pay Invoice**: 
   - Click "Pay with Tempo"
   - Confirm transaction
   - Instant blockchain confirmation
6. **View Proof**: Transaction hash links to Tempo Explorer

## Security

- Non-custodial wallets (Privy embedded)
- Client-side transaction signing
- Blockchain-verified payments
- Transparent transaction history

## Tempo Advantages

1. **Instant Finality** - No waiting for confirmations
2. **Stablecoin Native** - No price volatility
3. **Low Fees** - Paid in stablecoins
4. **Transaction Memos** - Built-in metadata support
5. **EVM Compatible** - Standard Web3 tooling

## Use Cases

- Freelancer invoicing
- Small business payments
- Contractor payments
- Service billing
- International payments (no FX fees)

## Development

### Adding New Features
- Hooks are in `/hooks` directory
- Blockchain config in `/config/tempo.ts`
- Components follow atomic design

### Testing Payments
Use Tempo testnet faucet to get test AlphaUSD:
- Visit Tempo faucet
- Enter your wallet address
- Receive test tokens

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and proprietary.

## Hackathon Highlights

### Innovation
- First invoice platform on Tempo blockchain
- Seamless Web2 UX with Web3 benefits
- Transaction memos for automatic reconciliation

### Technical Excellence
- Clean TypeScript architecture
- React hooks for blockchain interaction
- Privy integration for consumer UX

### Real-World Utility
- Solves actual freelancer pain points
- Instant international payments
- Blockchain proof of payment

## Contact

For questions or support, please open an issue on GitHub.

---

**Built for Canteen x Tempo Hackathon 2026**  
*Bringing instant stablecoin payments to invoice management*
