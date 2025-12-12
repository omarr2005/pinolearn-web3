# PinoLearn Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         PinoLearn Platform                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────────────────┐   │
│  │   Next.js   │   │    Clerk    │   │       Supabase          │   │
│  │  Frontend   │◄──│    Auth     │──►│   PostgreSQL DB         │   │
│  └──────┬──────┘   └─────────────┘   └─────────────────────────┘   │
│         │                                                           │
│         ▼                                                           │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    API Layer (Next.js)                       │   │
│  │  ┌─────────┐  ┌──────────┐  ┌─────────┐  ┌───────────────┐  │   │
│  │  │Roadmaps │  │ Lessons  │  │ Quizzes │  │ Achievements  │  │   │
│  │  └─────────┘  └──────────┘  └─────────┘  └───────────────┘  │   │
│  └──────────────────────────┬──────────────────────────────────┘   │
│                             │                                       │
│         ┌───────────────────┼───────────────────┐                   │
│         ▼                   ▼                   ▼                   │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────────┐     │
│  │   OpenAI    │    │   Redis     │    │  Polygon Network    │     │
│  │  (GPT-4)    │    │  (Cache)    │    │  (PINO Token)       │     │
│  └─────────────┘    └─────────────┘    └─────────────────────┘     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Core Components

### 1. Frontend (Next.js 15)

```
src/
├── app/                    # App Router pages
│   ├── dashboard/          # User dashboard
│   ├── roadmaps/           # Learning roadmaps
│   ├── discover/           # Content discovery
│   ├── business/           # LTD landing page
│   └── crypto-test/        # Web3 demo page
├── components/
│   ├── crypto/             # Web3 components
│   │   ├── ConnectWallet.tsx
│   │   └── RewardButton.tsx
│   ├── business/           # Business page components
│   └── subscription/       # Payment components
└── lib/                    # Utilities
    ├── prisma.ts           # Database client
    ├── subscription.ts     # Subscription logic
    └── rate-limit.ts       # API rate limiting
```

### 2. Database (Supabase + Prisma)

```sql
-- Core Models
User              -- User accounts & profiles
Roadmap           -- Learning roadmaps
Lesson            -- Individual lessons
Quiz              -- Interactive quizzes
Achievement       -- Gamification rewards
TokenWaitlist     -- PINO token waitlist

-- Web3 Fields in User
walletAddress     -- Connected MetaMask wallet
walletConnectedAt -- Connection timestamp
tokenBalance      -- PINO token balance
```

### 3. AI Services

| Service | Purpose |
|---------|---------|
| GPT-4 | Roadmap generation |
| GPT-4 | Lesson content creation |
| GPT-4 | Quiz generation |
| GPT-4 | Mentor chat responses |

### 4. Web3 Layer

```
Polygon Network (Amoy Testnet)
├── PINO Token Contract
│   ├── ERC20-like implementation
│   ├── rewardUser() function
│   └── batchReward() function
├── MetaMask Integration
│   ├── Wallet connection
│   └── Transaction signing
└── Reward Distribution
    ├── Lesson completion rewards
    └── Achievement rewards
```

---

## Data Flow

### Learning Flow

```
1. User creates roadmap → GPT-4 generates structure
2. User opens lesson → GPT-4 creates content
3. User completes lesson → XP awarded + PINO tokens
4. Progress saved → Prisma → Supabase
```

### Reward Flow

```
1. User completes learning activity
2. Backend validates completion
3. Backend calls PinoToken.rewardUser()
4. Tokens transferred to user wallet
5. Balance updated in database
```

---

## Security

| Layer | Protection |
|-------|------------|
| Auth | Clerk authentication |
| API | Rate limiting via Redis |
| Database | Row-level security |
| Web3 | Owner-only reward function |
| Frontend | CSP headers |

---

## Scalability

- **CDN**: Vercel Edge Network
- **Database**: Supabase with connection pooling
- **Cache**: Upstash Redis (global)
- **Blockchain**: Polygon L2 (low gas costs)
