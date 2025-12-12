# PinoLearn Web3 Integration

> 🎓 **Learn-to-Earn AI Education Platform on Polygon**

[![Live Demo](https://img.shields.io/badge/Live-pinolearn.com-8A5E4E?style=for-the-badge)](https://pinolearn.com)
[![Network](https://img.shields.io/badge/Network-Polygon-7B3FE4?style=for-the-badge)](https://polygon.technology)
[![Token](https://img.shields.io/badge/Token-PINO-B8956A?style=for-the-badge)](https://amoy.polygonscan.com)

---

## 🚀 Overview

PinoLearn is an **AI-powered education platform** with integrated **blockchain rewards**. Users earn **PINO tokens** as they complete lessons, quizzes, and achievements. Built on **Polygon** for fast, low-cost transactions.

### Key Features

| Feature | Description |
|---------|-------------|
| 🗺️ **AI Roadmaps** | Generate personalized learning paths for any topic in 30 seconds |
| 🧠 **Expert Perspectives** | Learn from 6 AI personas (Einstein, Feynman, Da Vinci, Socrates, Curie, Turing) |
| 💰 **Token Rewards** | Earn PINO tokens for completing lessons and achievements |
| 👛 **MetaMask Integration** | Connect wallet to receive blockchain rewards |
| 📊 **Progress Tracking** | Gamified learning with XP, levels, and leaderboards |

---

## 🔗 Live Links

- **Platform**: [pinolearn.com](https://pinolearn.com)
- **Business Page**: [pinolearn.com/business](https://pinolearn.com/business)
- **Web3 Demo**: [pinolearn.com/crypto-test](https://pinolearn.com/crypto-test)

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Framer Motion** - Animations
- **Tailwind CSS** - Styling

### Backend
- **Prisma** - Database ORM
- **Supabase** - PostgreSQL database
- **Clerk** - Authentication
- **Redis** - Caching & rate limiting

### Web3
- **ethers.js** - Ethereum library
- **Polygon Network** - Layer 2 blockchain
- **MetaMask** - Wallet integration
- **PINO Token** - ERC20-like reward token

---

## 📜 Smart Contract

### PinoToken.sol

```solidity
contract PinoToken {
    string public constant name = "Pino Reward Token";
    string public constant symbol = "PINO";
    uint8 public constant decimals = 18;
    uint256 public totalSupply = 1_000_000 * 10**18;
    
    // Reward users for learning
    function rewardUser(address user, uint256 amount, string memory reason) public;
    
    // Batch rewards for gas optimization
    function batchReward(address[] memory users, uint256[] memory amounts) public;
}
```

### Contract Details

| Property | Value |
|----------|-------|
| Network | Polygon Amoy (Testnet) |
| Token Name | Pino Reward Token |
| Symbol | PINO |
| Decimals | 18 |
| Total Supply | 1,000,000 PINO |

---

## 🎮 Learn-to-Earn Mechanics

```
User Journey:
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Connect Wallet │ ──▶ │ Complete Lesson │ ──▶ │  Earn PINO      │
│  (MetaMask)     │     │ (AI-Generated)  │     │  (On-Chain)     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Reward Structure

| Activity | PINO Reward |
|----------|-------------|
| Complete Lesson | 10 PINO |
| Pass Quiz (80%+) | 25 PINO |
| Finish Roadmap | 100 PINO |
| Daily Streak (7 days) | 50 PINO |
| Achievement Unlocked | 15-100 PINO |

---

## 📁 Repository Structure

```
pinolearn-web3/
├── README.md                    # This file
├── LICENSE                      # MIT License
├── contracts/
│   └── PinoToken.sol           # Reward token contract
├── src/
│   └── components/
│       └── crypto/
│           ├── ConnectWallet.tsx   # MetaMask connection
│           └── RewardButton.tsx    # Token reward UI
├── docs/
│   ├── ARCHITECTURE.md         # System architecture
│   └── WEB3_INTEGRATION.md     # Web3 integration guide
└── screenshots/
    ├── platform-demo.png
    ├── crypto-test.png
    └── wallet-connected.png
```

---

## 🔧 Local Development

```bash
# Clone repository
git clone https://github.com/yourusername/pinolearn-web3.git

# Install dependencies
npm install

# Set environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

### Environment Variables

```env
NEXT_PUBLIC_PINO_TOKEN_ADDRESS=0x...
NEXT_PUBLIC_CHAIN_ID=80002
NEXT_PUBLIC_RPC_URL=https://rpc-amoy.polygon.technology
```

---

## 🎯 Grant Application Proof

This repository demonstrates:

- ✅ **Working Smart Contract** - Deployed on Polygon Amoy
- ✅ **MetaMask Integration** - Wallet connection & signing
- ✅ **Token Distribution** - Automated rewards for learning
- ✅ **Live Platform** - Production deployment at pinolearn.com
- ✅ **Real Users** - Active learning community

---

## 📞 Contact

- **Website**: [pinolearn.com](https://pinolearn.com)
- **Email**: contact@pinolearn.com
- **Twitter**: [@pinolearn](https://twitter.com/pinolearn)

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

<p align="center">
  <b>Built with ❤️ for learners worldwide</b>
</p>
