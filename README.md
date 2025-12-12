# PinoLearn — AI-Powered Personalized Education Platform

Complete EdTech OS with blockchain rewards. Built solo in ~1 month with $40.

[Live](https://pinolearn.com) • [Business](https://pinolearn.com/business) • [Web3 Demo](https://pinolearn.com/crypto-test) • [Video](https://youtu.be/CW1JPJAyGO8)

---

## Technical Scale

```
120 API routes
63  UI components + 9 dirs
64  lib modules  
908 line database schema
40+ database models
```

---

## AI System

### 6 Mentor Personas
Einstein • Socrates • Da Vinci • Sun Tzu • The Visionary • The Warrior

### 12 Learning Contexts
Philosophy • History • Art & Design • Psychology • Economics • Entrepreneurship • Programming • Physics • Biology • Mathematics

**72 unique AI combinations** (6 personas × 12 contexts)

### Major Components
| Component | Lines |
|-----------|-------|
| ChatView | 539 |
| QuizView | 466 |
| CreateRoadmapForm | 351 |
| FlashcardView | 292 |
| OnboardingWizard | 585 |

---

## Enterprise Resilience

### Database Failover
Primary: Supabase → Backup: Azure PostgreSQL

### Redis Failover
Primary: Upstash → Azure Cache → Mock fallback

### Emergency Mode
Circuit breaker pattern. Auto-activates under load. 15-minute recovery.

---

## Algorithms

### Popularity Score
```
(rating × 10 × count) + (clones × 5) + (views × 0.1) - agePenalty
```

### Gamification
- XP system with 6 levels
- Daily streaks (7/30/100/365 day milestones)
- 18+ achievements (5 rarity tiers)

---

## Security

- DOMPurify sanitization (170 lines)
- XSS prevention
- SSRF protection
- Rate limiting
- CSP headers

---

## Social Features

- Public roadmaps with SEO slugs
- Clone with attribution
- 1-5 star ratings
- Follow system
- Leaderboard (334 lines)
- Notifications (6 types)

---

## Organizations (B2B)

- Team tier ($299) — 5 members
- Business tier ($899) — 20 members
- Role-based access: Owner/Admin/Member

---

## Web3

- MetaMask wallet connection
- PINO token on Polygon Amoy
- Token waitlist

---

## Links

- [pinolearn.com](https://pinolearn.com)
- [PolygonScan](https://amoy.polygonscan.com/address/0x6852724e564103cbb7572f0a54db637330907e65)
- [GitHub](https://github.com/omarr2005)

---

MIT License
