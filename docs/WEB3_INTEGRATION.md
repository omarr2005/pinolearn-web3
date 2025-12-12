# Web3 Integration Guide

## Overview

PinoLearn integrates blockchain technology to reward learners with PINO tokens. This document explains the technical implementation.

---

## Smart Contract

### PinoToken.sol

The PINO token is a simplified ERC20-like token deployed on Polygon.

#### Key Functions

```solidity
// Reward a user for completing learning activities
function rewardUser(
    address user,      // User's wallet address
    uint256 amount,    // Amount of tokens (in wei)
    string memory reason   // Reason for reward
) public onlyOwner

// Batch reward multiple users (gas optimization)
function batchReward(
    address[] memory users,
    uint256[] memory amounts
) public onlyOwner
```

#### Events

```solidity
event Reward(address indexed to, uint256 value, string reason);
event Transfer(address indexed from, address indexed to, uint256 value);
```

---

## Frontend Integration

### 1. ConnectWallet Component

Handles MetaMask wallet connection:

```tsx
// src/components/crypto/ConnectWallet.tsx

const connectWallet = async () => {
  // Request account access
  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });
  
  // Save to database
  await fetch('/api/user/connect-wallet', {
    method: 'POST',
    body: JSON.stringify({ walletAddress: accounts[0] }),
  });
};
```

### 2. RewardButton Component

Triggers token rewards:

```tsx
// src/components/crypto/RewardButton.tsx

const sendReward = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  
  const contract = new ethers.Contract(
    TOKEN_ADDRESS,
    TOKEN_ABI,
    signer
  );
  
  const tx = await contract.rewardUser(
    userWallet,
    ethers.parseEther('10'),  // 10 PINO
    'Lesson_Completed'
  );
  
  await tx.wait();
};
```

---

## API Endpoints

### Connect Wallet

```
POST /api/user/connect-wallet
Body: { walletAddress: "0x..." }
Response: { success: true }
```

### Token Waitlist

```
POST /api/token-waitlist
Body: { email: "user@example.com", walletAddress?: "0x..." }
Response: { success: true, position: 42 }
```

---

## Network Configuration

### Polygon Amoy (Testnet)

```env
NEXT_PUBLIC_CHAIN_ID=80002
NEXT_PUBLIC_RPC_URL=https://rpc-amoy.polygon.technology
NEXT_PUBLIC_PINO_TOKEN_ADDRESS=0x...
```

### MetaMask Network Settings

| Property | Value |
|----------|-------|
| Network Name | Polygon Amoy |
| RPC URL | https://rpc-amoy.polygon.technology |
| Chain ID | 80002 |
| Currency | POL |
| Explorer | https://amoy.polygonscan.com |

---

## Reward Flow

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│    User      │    │   Backend    │    │  Polygon     │
│  completes   │───▶│   validates  │───▶│  Contract    │
│   lesson     │    │   & calls    │    │  rewardUser  │
└──────────────┘    └──────────────┘    └──────────────┘
                                               │
                                               ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Balance    │◀───│  Transaction │◀───│   Tokens     │
│   updated    │    │   confirmed  │    │  transferred │
└──────────────┘    └──────────────┘    └──────────────┘
```

---

## Database Schema

```prisma
model User {
  id               String    @id
  walletAddress    String?   @unique
  walletConnectedAt DateTime?
  tokenBalance     Float     @default(0)
}

model TokenWaitlist {
  id            String   @id @default(cuid())
  email         String   @unique
  walletAddress String?
  source        String   @default("business_page")
  createdAt     DateTime @default(now())
}
```

---

## Security Considerations

1. **Owner-Only Rewards**: Only contract owner can call `rewardUser()`
2. **Backend Validation**: All rewards validated server-side before blockchain call
3. **Rate Limiting**: API endpoints protected by Redis rate limiter
4. **Wallet Verification**: Wallet ownership verified via signature

---

## Testing

### Local Development

```bash
# Start dev server
npm run dev

# Navigate to
http://localhost:3000/crypto-test
```

### Testing Rewards

1. Connect MetaMask to Polygon Amoy
2. Get test POL from [faucet](https://faucet.polygon.technology)
3. Click "Send Test Reward" button
4. Confirm transaction in MetaMask
5. Check balance on PolygonScan

---

## Deployment

### Contract Deployment (Remix)

1. Open [remix.ethereum.org](https://remix.ethereum.org)
2. Create `PinoToken.sol` file
3. Compile with Solidity 0.8.20+
4. Deploy to Polygon Amoy
5. Note contract address

### Environment Setup

```bash
# Add to Vercel environment variables
NEXT_PUBLIC_PINO_TOKEN_ADDRESS=0x...
NEXT_PUBLIC_CHAIN_ID=80002
NEXT_PUBLIC_RPC_URL=https://rpc-amoy.polygon.technology
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| MetaMask not detected | Install MetaMask extension |
| Wrong network | Add Polygon Amoy to MetaMask |
| Transaction failed | Ensure sufficient POL for gas |
| Wallet not connecting | Check browser permissions |
