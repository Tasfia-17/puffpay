# PuffPay - Tempo Hackathon Demo Guide

## 🎯 Quick Demo (3 minutes)

### Setup (30 seconds)
1. Visit the app
2. Click "Connect Wallet & Sign In"
3. Login with email (Privy creates wallet automatically)
4. Complete onboarding with business details

### Create Invoice (60 seconds)
1. Click "+" button or go to Invoices tab
2. Select or add a client
3. **Enter client's Tempo wallet address** (0x...)
4. Add invoice details:
   - Description: "Website Design"
   - Amount: $500
   - Due date: Today
5. Click "Send Invoice"

### Pay Invoice (60 seconds)
1. Go to Invoices tab
2. Click on the invoice you created
3. Click "PAY WITH TEMPO"
4. Confirm transaction in wallet
5. ✅ Payment confirmed instantly!
6. View transaction on Tempo Explorer

### Verify (30 seconds)
1. Check transaction hash in invoice details
2. Click "View on Explorer" link
3. See invoice ID in transaction memo
4. Balance updated in real-time

---

## 🔑 Test Wallet Addresses

Use these pre-funded testnet wallets for demo:

**Wallet 1 (Invoice Creator):**
```
Address: 0x031891A61200FedDd622EbACC10734BC90093B2A
Private Key: 0x2b9e3b8a095940cf3461e27bfb2bebb498df9a6381b76b9f9c48c9bbdc3c8192
```

**Wallet 2 (Client/Payer):**
```
Address: 0xAcF8dBD0352a9D47135DA146EA5DbEfAD58340C4
Private Key: 0xf3c009932cfe5e0b20db6c959e28e3546047cf70309d0f2ac5d38ee14527739a
```

Each wallet has 1,000,000 AlphaUSD, BetaUSD, ThetaUSD, and PathUSD.

---

## 🎬 Demo Script

### Scenario: Freelancer Invoice Payment

**Characters:**
- Alice (Freelancer) - Creates invoice
- Bob (Client) - Pays invoice

**Flow:**

1. **Alice creates account**
   - Login with alice@example.com
   - Wallet created automatically
   - Sets up business profile

2. **Alice creates invoice for Bob**
   - Client: Bob's Company
   - Wallet: 0xAcF8dBD0352a9D47135DA146EA5DbEfAD58340C4
   - Amount: $500
   - Description: "Website Design - Homepage"
   - Invoice ID: INV-0001

3. **Bob receives invoice**
   - Login with bob@example.com
   - Views invoice details
   - Sees amount and description

4. **Bob pays invoice**
   - Clicks "Pay with Tempo"
   - Transaction processes instantly
   - Invoice marked as PAID
   - Transaction hash: 0x...

5. **Alice receives payment**
   - Balance updates immediately
   - Transaction appears in history
   - Can verify on Tempo Explorer

---

## 🌟 Key Features to Highlight

### 1. Instant Settlement
- No waiting for confirmations
- Payment status updates in real-time
- Faster than traditional banking

### 2. Blockchain Proof
- Every payment has transaction hash
- Invoice ID embedded in blockchain
- Immutable payment record
- Verifiable on public explorer

### 3. Stablecoin Native
- No crypto volatility
- $1 = 1 AlphaUSD always
- No conversion needed
- Familiar USD amounts

### 4. Email Login
- No seed phrases
- No wallet setup complexity
- Just email and password
- Wallet created automatically

### 5. Transaction Memos
- Invoice IDs in blockchain
- Automatic reconciliation
- No manual matching needed
- Perfect audit trail

---

## 🎯 Winning Points

### Innovation
✅ First invoice platform on Tempo  
✅ Transaction memos for reconciliation  
✅ Seamless Web2 UX with Web3 benefits  

### Technical Excellence
✅ Clean TypeScript architecture  
✅ React hooks for blockchain  
✅ Privy integration for consumer UX  
✅ Real-time balance updates  

### Real-World Utility
✅ Solves freelancer pain points  
✅ Instant international payments  
✅ Blockchain proof of payment  
✅ No chargebacks or disputes  

### Tempo Features Used
✅ Transfer with memos (invoice IDs)  
✅ Privy wallet provisioning  
✅ TIP-20 stablecoin transfers  
✅ Instant finality  
✅ Fee payment in stablecoins  

---

## 📊 Comparison

| Feature | Traditional | PuffPay + Tempo |
|---------|------------|-----------------|
| Settlement | 3-5 days | Instant |
| Fees | 2.9% + $0.30 | ~$0.01 |
| International | High fees | Same as local |
| Proof | Email receipt | Blockchain |
| Chargebacks | Yes | No |
| Reconciliation | Manual | Automatic |

---

## 🚀 Future Enhancements

1. **Recurring Invoices** - Automatic monthly billing
2. **Multi-Currency** - Support BetaUSD, ThetaUSD
3. **Payment Links** - Shareable URLs for invoices
4. **Email Notifications** - Auto-send when paid
5. **Analytics Dashboard** - Revenue tracking
6. **Mobile App** - iOS/Android native apps
7. **API Integration** - Connect to accounting software
8. **Bulk Invoicing** - Create multiple at once

---

## 🎥 Video Demo Script

**[0:00-0:15] Introduction**
"Hi, I'm demonstrating PuffPay - an invoice platform built on Tempo blockchain for instant stablecoin payments."

**[0:15-0:30] Problem**
"Freelancers wait 3-5 days for payments and pay high fees. International payments are even worse."

**[0:30-0:45] Solution**
"PuffPay uses Tempo blockchain for instant settlement with stablecoins. No volatility, no waiting."

**[0:45-1:30] Demo**
- Login with email
- Create invoice with wallet address
- Pay invoice with one click
- Show instant confirmation
- View on Tempo Explorer

**[1:30-2:00] Key Features**
- Instant settlement
- Blockchain proof
- Transaction memos
- Email login (no seed phrases)

**[2:00-2:30] Tempo Integration**
- Show transaction hash
- Show memo with invoice ID
- Show balance update
- Show explorer link

**[2:30-3:00] Conclusion**
"PuffPay brings Web3 payments to freelancers with Web2 UX. Built on Tempo for instant, low-cost, stablecoin payments."

---

## 📝 Submission Checklist

- [x] Privy authentication working
- [x] Real Tempo blockchain transfers
- [x] Invoice IDs in transaction memos
- [x] Transaction hashes displayed
- [x] Links to Tempo Explorer
- [x] Real-time balance updates
- [x] README with Tempo features
- [x] Clean, production-ready code
- [x] Deployed demo (optional)
- [ ] Demo video (2-3 min)
- [ ] Submit to hackathon form

---

## 🔗 Important Links

- **GitHub**: https://github.com/Tasfia-17/puffpay
- **Tempo Explorer**: https://explore.tempo.xyz
- **Tempo Docs**: https://docs.tempo.xyz
- **Privy Dashboard**: https://dashboard.privy.io

---

## 💡 Tips for Judges

1. **Check the transaction memo** - Invoice IDs are embedded in blockchain
2. **Test the payment flow** - It's actually instant (no mock data)
3. **View on Explorer** - All transactions are real and verifiable
4. **Check the balance** - Updates in real-time from blockchain
5. **Try the UX** - No seed phrases, just email login

---

**Built for Canteen x Tempo Hackathon 2026**  
*Track: Consumer Payments & Social Finance*
