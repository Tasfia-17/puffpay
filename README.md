# PuffPay

A modern invoice management system built with React and TypeScript. PuffPay helps freelancers and small businesses create, manage, and track invoices efficiently.

## Features

- **User Authentication** - Secure login system
- **Dashboard** - Overview of all invoices with status tracking (paid, pending, overdue)
- **Invoice Management** - Create, view, and manage invoices
- **Client Management** - Add and organize client information
- **Onboarding Flow** - Guided setup for new users
- **Settings** - Customize business profile and preferences

## Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **UI Icons**: Lucide React
- **Styling**: CSS-in-JS

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

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

3. Set up environment variables:
   - Copy `.env.local` and add your `GEMINI_API_KEY`

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure

```
puffpay/
├── components/
│   ├── LoginForm.tsx       # Authentication component
│   ├── Dashboard.tsx       # Main dashboard view
│   ├── NewInvoice.tsx      # Invoice creation form
│   ├── InvoiceDetails.tsx  # Invoice detail view
│   ├── AddClient.tsx       # Client management
│   ├── Settings.tsx        # User settings
│   ├── Onboarding.tsx      # First-time user setup
│   └── Logo.tsx            # Brand logo component
├── App.tsx                 # Main app with routing
├── index.tsx               # React entry point
└── index.html              # HTML template
```

## Usage

1. **Login** - Start by logging into your account
2. **Onboarding** - Complete the setup wizard (first-time users)
3. **Add Clients** - Navigate to client management to add your clients
4. **Create Invoices** - Use the dashboard to create new invoices
5. **Track Status** - Monitor invoice status (pending, paid, overdue)
6. **Manage Settings** - Customize your business profile

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and proprietary.

## Contact

For questions or support, please open an issue on GitHub.
