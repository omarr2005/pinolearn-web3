# PinoLearn Web3 Integration

> AI-powered education meets blockchain rewards. Learn anything, earn PINO tokens.

[Live Platform](https://pinolearn.com) • [Business Page](https://pinolearn.com/business) • [Web3 Demo](https://pinolearn.com/crypto-test)

---

## What is PinoLearn?

I'm a university student who built PinoLearn in about a month to solve a simple problem: learning is hard, and people give up too easily.

Our solution? **Pay people to learn.** Every time you complete a lesson, pass a quiz, or finish a roadmap - you earn PINO tokens on Polygon. Real crypto, real value.

The platform uses AI to generate personalized learning paths. You pick any topic, and within 30 seconds, you have a complete roadmap with lessons, quizzes, and 6 different AI mentors (think Einstein explaining physics, or Da Vinci teaching design).

---

## Why Polygon?

Simple math:
- Ethereum gas for a reward: ~$2-5
- Polygon gas for a reward: ~$0.001

When you're rewarding users for completing 10-minute lessons, you can't afford $5 per transaction. Polygon makes micro-rewards actually work.

---

## The Stack

**Frontend:** Next.js 15, React 19, TypeScript, Framer Motion

**Backend:** Prisma, Supabase (PostgreSQL), Clerk auth, Redis

**Web3:** ethers.js, MetaMask, Polygon Amoy testnet

---

## How Token Rewards Work

```
1. User connects MetaMask wallet
2. User completes learning activity
3. Backend validates completion
4. Smart contract sends PINO tokens
5. User sees balance update
```

### Reward Amounts

| Activity | Tokens |
|----------|--------|
| Finish a lesson | 10 PINO |
| Pass quiz (80%+) | 25 PINO |
| Complete roadmap | 100 PINO |
| 7-day streak | 50 PINO |

---

## Smart Contract

The PINO token is a simple ERC20-like contract optimized for learn-to-earn:

```solidity
function rewardUser(address user, uint256 amount, string memory reason) public onlyOwner {
    balanceOf[owner] -= amount;
    balanceOf[user] += amount;
    emit Reward(user, amount, reason);
}
```

Currently deployed on Polygon Amoy (testnet). Mainnet deployment planned after grant funding.

---

## Repository Structure

```
├── contracts/PinoToken.sol      # Token contract
├── src/components/crypto/
│   ├── ConnectWallet.tsx        # MetaMask integration
│   └── RewardButton.tsx         # Token distribution UI
└── docs/
    ├── ARCHITECTURE.md          # System overview
    └── WEB3_INTEGRATION.md      # Technical details
```

---

## Live Demo

The platform is live at **pinolearn.com**. No signup required to explore.

For Web3 features, visit [pinolearn.com/crypto-test](https://pinolearn.com/crypto-test) - connect your wallet and see the reward system in action.

Demo video: [youtube.com/watch?v=CW1JPJAyGO8](https://youtu.be/CW1JPJAyGO8)

---

## What This Proves

- Working smart contract on Polygon
- Real MetaMask integration
- Live production platform
- Actual token distribution

Not a pitch deck. Not a concept. Working code.

---

## Contact

**Email:** mrm000184@gmail.com

**GitHub:** [github.com/omarr2005](https://github.com/omarr2005)

---

MIT License
