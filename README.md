# PinoLearn — AI-Powered Personalized Education Platform

Complete EdTech OS with blockchain rewards. Built solo in ~1 month with $40 budget.

[Live Platform](https://pinolearn.com) • [Business](https://pinolearn.com/business) • [Web3 Demo](https://pinolearn.com/crypto-test) • [Demo Video](https://youtu.be/CW1JPJAyGO8)

---

## Platform Architecture

```
52  API endpoints
64  lib modules  
908 lines database schema
40+ database models
6   AI mentor personas
5   subscription tiers
18+ rare achievements
```

---

## Core Features

### AI-Powered Learning
- **Roadmap Generation**: Any topic → complete learning path in 30 seconds
- **Smart Content Creation**: AI auto-generates lessons, quizzes, flashcards
- **Multiple Input Types**: Topic, YouTube URL, Article URL, PDF URL
- **Content Depth Options**: Quick Overview (3-4 lessons), Standard (5-8), In-Depth (10-15)
- **Personalization**: AI adapts content based on user's learning goals and background

### 6 AI Mentor Personas
| Persona | Teaching Style |
|---------|---------------|
| Albert Einstein | Scientific & Imaginative — simplifies with physics analogies |
| The Visionary | Bold & Futuristic — first principles thinking |
| Socrates | Questioning & Insightful — Socratic method, no direct answers |
| Leonardo da Vinci | Creative & Interdisciplinary — connects art, science, engineering |
| Sun Tzu | Strategic & Tactical — frames learning as strategic challenges |
| The Warrior | Intense & Disciplined — mental toughness, no excuses |

### Gamification System
- **XP System**: Points for every learning activity
- **6 Level Tiers**: Novice → Explorer → Achiever → Expert → Master → Legend
- **Daily Streaks**: 7-day, 30-day, 100-day, 365-day milestones
- **18+ Achievements** across 5 rarity tiers:
  - Common (90%), Uncommon (50%), Rare (10%), Epic (1%), Legendary (0.1%)
  - Rewards up to 30,000 XP for Legendary achievements

### Social EdTech
- Public/private roadmaps with SEO-optimized URLs
- Discover page with trending topics and popularity scoring
- User profiles, following system, notifications
- Embeddable roadmap widgets
- Leaderboards (daily, weekly, all-time)
- Comments and ratings on public roadmaps

### Referral Program
- Unique referral codes per user
- Rewards: Pro trial days + AI credits for both referrer and referred
- Milestone badges: Early Adopter (5 referrals), Ambassador (10 referrals)

### Organizations (B2B)
- **Team tier** ($299 lifetime) — 5 members
- **Business tier** ($899 lifetime) — 20 members
- Role-based access: Owner, Admin, Member
- Shared roadmaps within organization
- Team activity feeds
- Daily analytics aggregates (Business tier)
- Invitation system with approval workflow

### Quizzes & Flashcards
- AI-generated quiz questions with multiple choice
- Flashcard sets with term/definition pairs
- Quiz attempt tracking with scoring
- Progress tracking per lesson

### Usage Monitoring
Daily limits for free users:
- 1 roadmap creation
- 3 mentor chat messages
- 3 quiz generations
- 3 flashcard sets
- 3 AI explanations

Pro users: unlimited everything.

### Blockchain Rewards (Polygon)
- MetaMask wallet connection
- PINO token rewards for learning activities
- Smart contract on Polygon Amoy testnet
- Batch rewards for gas optimization

---

## Technical Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15, React 19, TypeScript, Framer Motion |
| Database | Supabase PostgreSQL, Prisma ORM (908-line schema) |
| Auth | Clerk (SSO, OAuth, social login) |
| Cache | Redis with failover (Upstash → Azure → Mock) |
| AI | OpenRouter (Llama 3.3 70B, GPT-4, Claude) |
| Payments | Lemon Squeezy + legacy Paddle support |
| Web3 | ethers.js, MetaMask, Polygon Amoy |
| Analytics | PostHog |
| Errors | Sentry |
| Hosting | Vercel Edge Network |

### Security Features
- SSRF protection for URL fetching
- Content sanitization (XSS prevention)
- Rate limiting with Redis
- CSP headers
- Input validation

### Content Extraction
- YouTube transcript extraction (multi-language)
- Article parsing with Mozilla Readability
- PDF parsing with pdf.js
- Intelligent fallback generation

---

## Database Models (40+)

**Core**: User, Roadmap, Lesson, Resource, Quiz, Flashcard

**Social**: Follow, Comment, Rating, Activity, Notification

**Gamification**: Achievement, UserStats, Streak, QuizAttempt

**Organizations**: Organization, OrganizationMember, OrganizationInvite, TeamActivity, TeamAnalytics

**Payments**: Subscription, UserUsage, Referral, UserRewards

**Web3**: TokenWaitlist, wallet fields in User

---

## Subscription Tiers

| Tier | Price | Features |
|------|-------|----------|
| Free | $0 | Limited daily usage |
| Pro Monthly | $15/mo | Unlimited everything |
| Pro Yearly | $99/yr | Save $81/year |
| Solo Lifetime | $79 | Pay once, own forever |
| Team Lifetime | $299 | 5 members |
| Business Lifetime | $899 | 20 members + analytics |

---

## Repository Contents

```
├── contracts/PinoToken.sol      # ERC20-like reward token
├── src/components/crypto/
│   ├── ConnectWallet.tsx        # MetaMask integration
│   └── RewardButton.tsx         # Token distribution
└── docs/
    ├── ARCHITECTURE.md
    └── WEB3_INTEGRATION.md
```

---

## Links

- Platform: [pinolearn.com](https://pinolearn.com)
- Business: [pinolearn.com/business](https://pinolearn.com/business)
- Web3 Demo: [pinolearn.com/crypto-test](https://pinolearn.com/crypto-test)
- Demo Video: [YouTube](https://youtu.be/CW1JPJAyGO8)
- PolygonScan: [Transactions](https://amoy.polygonscan.com/address/0x6852724e564103cbb7572f0a54db637330907e65)

---

## Contact

**Email:** mrm000184@gmail.com

**GitHub:** [github.com/omarr2005](https://github.com/omarr2005)

---

MIT License
