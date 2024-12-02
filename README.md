# 🚀 Bitcoin Dashboard

## Overview

A modern, real-time cryptocurrency tracking application built with Next.js, TypeScript, and Tailwind CSS. This dashboard provides live price tracking, historical price charts, and a Bitcoin halving countdown.

![Dashboard Preview](/dashboard-preview.png)

## 🌟 Features

### Price Tracker
- Real-time cryptocurrency price updates
- Support for Bitcoin, Ethereum, and Cardano
- 24-hour price change percentage
- Interactive price history chart
- Responsive design

### Halving Countdown
- Live countdown to the next Bitcoin halving
- Accurate block height tracking
- Estimated next halving block display

## 🛠 Technologies

- **Frontend**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charting**: Recharts
- **API**: CoinGecko API
- **Icons**: Lucide React

## 📦 Prerequisites

- Node.js (v18 or later)
- npm or yarn
- CoinGecko API Key

## 🔧 Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/bitcoin-dashboard.git
cd bitcoin-dashboard
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the project root
```bash
NEXT_PUBLIC_BASE_URL_COIN=https://api.coingecko.com/api/v3
NEXT_PUBLIC_API_KEY_COIN=your_coingecko_api_key
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

## 🌐 Deployment

The project is optimized for Vercel deployment:
- Easily deployable with zero configuration
- Automatic environment variable handling
- Serverless function support

## 🔍 API Usage

- Cryptocurrency data fetched from CoinGecko API
- Real-time price updates every minute
- Block height retrieved from Blockchain.info

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

Your Name - [Your Email]

Project Link: [https://github.com/yourusername/bitcoin-dashboard](https://github.com/yourusername/bitcoin-dashboard)

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [CoinGecko API](https://www.coingecko.com/en/api/documentation)
- [Recharts](http://recharts.org/)
