# PinoLearn — AI-Powered Personalized Education Platform

Complete EdTech OS with blockchain rewards. Built solo in ~1 month with $40 budget.

[Live Platform](https://pinolearn.com) • [Business](https://pinolearn.com/business) • [Web3 Demo](https://pinolearn.com/crypto-test) • [Demo Video](https://youtu.be/CW1JPJAyGO8)

---

## Platform Architecture

```
120 API endpoints
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
- **Content Depth Options**: Quick Overview, Standard, In-Depth
- **Personalization**: AI adapts based on user's learning goals

### 6 AI Mentor Personas
| Persona | Teaching Style |
|---------|---------------|
| Albert Einstein | Scientific & Imaginative |
| The Visionary | Bold & Futuristic — first principles |
| Socrates | Questioning & Insightful — Socratic method |
| Leonardo da Vinci | Creative & Interdisciplinary |
| Sun Tzu | Strategic & Tactical |
| The Warrior | Intense & Disciplined |

### AI Skills Extraction
- Automatically extracts skills from completed roadmaps
- Categorizes: programming, design, business, data
- AI-enhanced using OpenRouter API
- Visual skill levels (1-5 stars)

### Certificate System
- Completion certificates for finished roadmaps
- Shareable certificate pages
- Dynamic OG images for social sharing

### Embeddable Widgets
- Full embed system at `/embed/[roadmapId]`
- Responsive embed preview
- Referral tracking
- Auto view counting

### Gamification System
- XP for every activity
- 6 level tiers: Novice → Explorer → Achiever → Expert → Master → Legend
- Daily streaks with milestones (7/30/100/365 days)
- 18+ achievements across 5 rarity tiers (Common to Legendary)
- Rewards up to 30,000 XP

### Social EdTech
- Public/private roadmaps with SEO URLs
- Discover page with popularity scoring
- User profiles, following, notifications
- Leaderboards (daily, weekly, all-time)
- Social sharing (Twitter, LinkedIn, WhatsApp)

### Referral Program
- Unique referral codes per user
- Rewards: Pro trial days + AI credits
- Milestone badges: Early Adopter, Ambassador

### Organizations (B2B)
- **Team tier** ($299 lifetime) — 5 members
- **Business tier** ($899 lifetime) — 20 members
- Role-based access: Owner, Admin, Member
- Shared roadmaps within organization
- Team activity feeds
- Daily analytics aggregates

### Blockchain Rewards (Polygon)
- MetaMask wallet connection
- PINO token rewards for learning activities
- On-chain proof of completion
- Batch rewards for gas optimization

---

## Technical Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15, React 19, TypeScript, Framer Motion |
| Database | Supabase PostgreSQL, Prisma ORM (908-line schema) |
| Auth | Clerk (SSO, OAuth) |
| Cache | Redis with failover (Upstash → Azure → Mock) |
| AI | OpenRouter (Llama 3.3 70B, GPT-4) |
| Payments | Lemon Squeezy |
| Web3 | ethers.js, MetaMask, Polygon |
| Analytics | PostHog |
| Errors | Sentry |
| Hosting | Vercel Edge Network |

### Performance Optimizations
- **Discover Precompute**: 99.8% query reduction (5000 → 12 queries/hour)
- **Multi-layer caching**: Dashboard, Lesson, Discover caches
- **Redis failover**: Upstash → Azure → Mock (never fails)

### Analytics Pipeline
PostHog tracking: roadmap_viewed, roadmap_shared, roadmap_cloned, roadmap_progress, roadmap_completed, roadmap_published

### Security
- SSRF protection for URL fetching
- Content sanitization (XSS prevention)
- Rate limiting with Redis
- CSP headers
- Emergency mode (circuit breaker)

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
