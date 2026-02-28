# Security Playbook

Production security runbook for Fee The Developer sites.  
All domains use **Cloudflare** (DNS + WAF). All web apps deploy on **Vercel** (Node 20).

---

## Table of Contents

1. [Cloudflare Configuration](#1-cloudflare-configuration)
2. [Bot Protection](#2-bot-protection)
3. [DNS & SSL Settings](#3-dns--ssl-settings)
4. [WAF Rules & Rate Limiting](#4-waf-rules--rate-limiting)
5. [Incident Response](#5-incident-response)
6. [Vercel Environment Variables](#6-vercel-environment-variables)
7. [Authentication Hardening](#7-authentication-hardening)
8. [Monitoring & Alerting](#8-monitoring--alerting)
9. [Go-Live Checklist](#9-go-live-checklist)

---

## 1. Cloudflare Configuration

### SSL/TLS

| Setting | Value | Location |
|---------|-------|----------|
| SSL Mode | **Full (strict)** | SSL/TLS → Overview |
| Always Use HTTPS | **On** | SSL/TLS → Edge Certificates |
| HSTS | **On** (max-age=31536000, includeSubDomains, preload) | SSL/TLS → Edge Certificates |
| Minimum TLS Version | **TLS 1.2** | SSL/TLS → Edge Certificates |
| TLS 1.3 | **On** | SSL/TLS → Edge Certificates |
| Automatic HTTPS Rewrites | **On** | SSL/TLS → Edge Certificates |

### Security Settings

| Setting | Value | Location |
|---------|-------|----------|
| Security Level | **High** | Security → Settings |
| Browser Integrity Check | **On** | Security → Settings |
| Challenge Passage | **30 minutes** | Security → Settings |
| Privacy Pass | **On** | Security → Settings |

---

## 2. Bot Protection

### Bot Fight Mode

Enable in **Security → Bots → Bot Fight Mode**.

This blocks known bad bots and challenges suspicious automated traffic at the edge — no code changes required.

### Super Bot Fight Mode (Pro+)

If on Cloudflare Pro or higher:
- **Definitely automated**: Block
- **Likely automated**: Managed Challenge
- **Verified bots**: Allow

### Cloudflare Turnstile (Public Forms)

Turnstile provides invisible CAPTCHA-like protection for forms without degrading UX.

**Setup:**
1. Go to [Cloudflare Turnstile Dashboard](https://dash.cloudflare.com/?to=/:account/turnstile)
2. Add a new site widget for your domain
3. Choose **Managed** mode (invisible when possible)
4. Copy the **Site Key** and **Secret Key**

**Environment variables:**
```
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x...   # Client-side (safe to expose)
TURNSTILE_SECRET_KEY=0x...              # Server-side only (NEVER expose)
```

**Client integration:** The contact form includes a Turnstile widget that generates a token.

**Server verification (in API routes):**
```typescript
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: process.env.TURNSTILE_SECRET_KEY!,
      response: token,
      remoteip: ip,
    }),
  });
  const data = await res.json();
  return data.success === true;
}
```

---

## 3. DNS & SSL Settings

### DNS Records

Ensure all DNS records proxy through Cloudflare (orange cloud enabled):

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| CNAME | @ | cname.vercel-dns.com | Proxied |
| CNAME | www | cname.vercel-dns.com | Proxied |

### Page Rules (if not using WAF Custom Rules)

| Rule | Setting |
|------|---------|
| `*feethedeveloper.com/*` | Always Use HTTPS |
| `*feethedeveloper.com/api/*` | Security Level: High, Cache Level: Bypass |

---

## 4. WAF Rules & Rate Limiting

### WAF Managed Rulesets

Enable in **Security → WAF → Managed Rules**:

1. **Cloudflare Managed Ruleset** — On (default action)
2. **Cloudflare OWASP Core Ruleset** — On (Paranoia Level 1, Anomaly Score threshold 60)
3. **Cloudflare Leaked Credentials Detection** — On

### Custom WAF Rules

#### Rule 1: Rate limit API endpoints

**Name:** `Rate limit API routes`  
**Expression:**
```
(http.request.uri.path matches "^/api/")
```
**Action:** Rate Limiting Rule  
**Settings:**
- Period: 10 seconds
- Requests: 20
- Mitigation: Block for 60 seconds
- With response type: Custom JSON → `{"error": "Rate limited. Please try again later."}`

#### Rule 2: Rate limit contact form (stricter)

**Name:** `Rate limit contact form`  
**Expression:**
```
(http.request.uri.path eq "/api/contact" and http.request.method eq "POST")
```
**Action:** Rate Limiting Rule  
**Settings:**
- Period: 60 seconds
- Requests: 3
- Mitigation: Block for 300 seconds
- Counting: Per IP

#### Rule 3: Block non-GET on health endpoint

**Name:** `Health endpoint GET only`  
**Expression:**
```
(http.request.uri.path eq "/api/health" and not http.request.method eq "GET")
```
**Action:** Block

#### Rule 4: Challenge suspicious paths

**Name:** `Challenge admin/login paths`  
**Expression:**
```
(http.request.uri.path matches "^/(admin|login|signup|wp-admin|wp-login|xmlrpc|.env)")
```
**Action:** Managed Challenge

#### Rule 5: Block known bad user agents

**Name:** `Block scanners and bad bots`  
**Expression:**
```
(http.user_agent contains "sqlmap" or
 http.user_agent contains "nikto" or
 http.user_agent contains "nmap" or
 http.user_agent contains "masscan" or
 http.user_agent contains "ZmEu" or
 http.user_agent contains "python-requests" and not http.request.uri.path matches "^/api/")
```
**Action:** Block

#### Rule 6: Geo-block (optional, if business is NA-only)

**Name:** `Geo restrict to operational regions`  
**Expression:**
```
(not ip.geoip.country in {"US" "CA" "GB" "DE" "FR" "AU"})
```
**Action:** Managed Challenge  
*Note: Only enable if your client base is restricted to these regions.*

### Rate Limiting Rules (WAF → Rate Limiting)

| Endpoint | Window | Max Requests | Block Duration | Scope |
|----------|--------|--------------|----------------|-------|
| `/api/*` | 10s | 20 | 60s | Per IP |
| `/api/contact` (POST) | 60s | 3 | 300s | Per IP |
| `/api/chat` (POST) | 10s | 5 | 120s | Per IP |

---

## 5. Incident Response

### Severity Levels

| Level | Description | Response Time |
|-------|-------------|---------------|
| **P0 — Critical** | Active exploitation, data breach | Immediate (< 1 hour) |
| **P1 — High** | Vulnerability with known exploit | < 4 hours |
| **P2 — Medium** | Vulnerability, no known exploit | < 24 hours |
| **P3 — Low** | Best-practice improvement | Next sprint |

### Immediate Response Steps (P0/P1)

#### 1. Contain

```bash
# Enable Cloudflare "Under Attack" mode
# Dashboard → Overview → Quick Actions → Under Attack Mode → On

# Or via Cloudflare API:
curl -X PATCH "https://api.cloudflare.com/client/v4/zones/{zone_id}/settings/security_level" \
  -H "Authorization: Bearer {api_token}" \
  -H "Content-Type: application/json" \
  --data '{"value":"under_attack"}'
```

#### 2. Rotate Secrets

```bash
# 1. Go to Vercel Dashboard → Project → Settings → Environment Variables
# 2. Rotate ALL secrets:
#    - OPENAI_API_KEY: Regenerate at https://platform.openai.com/api-keys
#    - POWER_AUTOMATE_LEAD_WEBHOOK_URL: Regenerate in Power Automate
#    - TURNSTILE_SECRET_KEY: Regenerate in Cloudflare Turnstile dashboard
# 3. Redeploy after updating env vars
```

#### 3. Revoke Tokens & Sessions

- Revoke all active API keys and generate new ones
- If using auth: invalidate all sessions, force re-authentication
- Rotate Vercel deployment tokens if CI/CD was compromised

#### 4. Investigate

1. **Cloudflare**: Security → Events → Filter by time window
2. **Vercel**: Project → Logs → Runtime Logs → Filter by error/status
3. **GitHub**: Settings → Code security → Review alerts
4. Cross-reference IP addresses across Cloudflare and Vercel logs
5. Check for unauthorized commits: `git log --oneline --since="24 hours ago"`

#### 5. Remediate

1. Patch the vulnerability
2. Push to branch, verify CI passes
3. Deploy to Vercel Preview → verify
4. Merge to main → production deploy
5. Verify Cloudflare Security Events show the attack vector is blocked

#### 6. Post-Incident

1. Write incident report (timeline, impact, root cause, remediation)
2. Update WAF rules if needed
3. Add detection for the attack vector
4. Review and update this playbook

---

## 6. Vercel Environment Variables

### Setup Guide

Go to **Vercel Dashboard → Project → Settings → Environment Variables**.

#### Production Variables

| Variable | Scope | Notes |
|----------|-------|-------|
| `OPENAI_API_KEY` | Production only | OpenAI API key for chat |
| `POWER_AUTOMATE_LEAD_WEBHOOK_URL` | Production only | Webhook for lead capture |
| `TURNSTILE_SECRET_KEY` | Production only | Cloudflare Turnstile server key |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Production + Preview | Turnstile client widget key |
| `UPSTASH_REDIS_REST_URL` | Production only | Optional: Redis rate limiter |
| `UPSTASH_REDIS_REST_TOKEN` | Production only | Optional: Redis rate limiter |

#### Preview Variables

| Variable | Scope | Notes |
|----------|-------|-------|
| `OPENAI_API_KEY` | Preview (separate key!) | Use a different API key with lower limits |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Preview | Can use Turnstile test key `1x00000000000000000000AA` |
| `TURNSTILE_SECRET_KEY` | Preview | Can use Turnstile test secret `1x0000000000000000000000000000000AA` |

#### Security Rules

1. **Never duplicate production secrets to Preview** — use separate, lower-privilege keys
2. **NEXT_PUBLIC_* variables** are exposed to the browser — only use for non-secret values
3. **Runtime validation**: The app checks for required env vars at startup and fails fast if missing
4. **Least privilege**: Only server routes (`app/api/*`) can access service keys like `OPENAI_API_KEY`

---

## 7. Authentication Hardening

> **Current state**: This repo has no admin/login system. The guidance below applies when authentication is added.

### When Adding Auth

1. **Use a real auth provider**: Auth.js (NextAuth), Clerk, or Microsoft Entra ID
2. **Never use query-string tokens** for authentication
3. **Cookie settings**:
   ```typescript
   {
     httpOnly: true,
     secure: true,
     sameSite: 'lax', // or 'strict' for admin routes
     path: '/',
     maxAge: 60 * 60 * 24, // 24 hours
   }
   ```
4. **CSRF protection**: Required for any cookie-based session. Use `csrf` token pattern or double-submit cookies
5. **RBAC for admin routes**: Middleware-level role checks before allowing access
6. **MFA for admin users**:
   - If using Entra ID: Enable Conditional Access → Require MFA for admin roles
   - If using Clerk: Enable MFA in Clerk Dashboard → User & Authentication → Multi-factor
   - If using Auth.js: Integrate TOTP (e.g., `otpauth` library) for admin accounts

### Middleware Protection Pattern

```typescript
// middleware.ts — protect admin routes
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const session = request.cookies.get('session_token');
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    // Verify session + role server-side
  }
  return NextResponse.next();
}
```

---

## 8. Monitoring & Alerting

### Vercel Logs

- **Runtime Logs**: Vercel Dashboard → Project → Logs
- Filter by: status code (4xx, 5xx), function name, time range
- Set up log drains to Datadog/Axiom/Betterstack for persistent storage

### Cloudflare Security Events

- **Dashboard**: Security → Events
- Review daily for:
  - Rate-limited requests spike
  - WAF blocks spike
  - Bot score anomalies
  - Geographic anomalies

### Recommended Alerts

| Trigger | Threshold | Channel |
|---------|-----------|---------|
| Spike in `/api/contact` POST | > 50 requests/hour from single IP | Email/Slack |
| Spike in `/api/chat` POST | > 100 requests/hour from single IP | Email/Slack |
| 5xx error rate | > 5% of requests in 5-minute window | Email/Slack/PagerDuty |
| WAF block spike | > 100 blocks in 10 minutes | Email/Slack |
| Failed auth attempts (future) | > 10 from single IP in 5 minutes | Email/Slack |
| Webhook delivery failures | > 3 consecutive failures | Email |
| Dependency vulnerability | Critical/High severity | GitHub notification |

### Setting Up Alerts

**Cloudflare Notifications:**
1. Dashboard → Notifications → Create
2. Select "Security Events" and "HTTP DDoS Attack"
3. Configure threshold and delivery method

**Vercel (with log drain):**
1. Set up log drain to Axiom/Datadog/Betterstack
2. Create alert rules based on log patterns
3. Key patterns to alert on:
   - `"Contact webhook error"` — webhook delivery failure
   - `status: 429` — rate limiting triggered
   - `status: 500` — server errors

---

## 9. Go-Live Checklist

### Cloudflare

- [ ] SSL mode set to Full (strict)
- [ ] Always Use HTTPS enabled
- [ ] HSTS enabled (max-age=31536000, includeSubDomains, preload)
- [ ] Minimum TLS version set to 1.2
- [ ] TLS 1.3 enabled
- [ ] Bot Fight Mode enabled
- [ ] WAF Managed Rulesets enabled (Cloudflare Managed + OWASP)
- [ ] Custom WAF rate-limit rules deployed
- [ ] Challenge rule for admin/login/wp-* paths deployed
- [ ] Turnstile widget configured

### Vercel

- [ ] Production env vars set (not duplicated to Preview)
- [ ] Preview env vars use separate lower-privilege keys
- [ ] No `NEXT_PUBLIC_*` variables contain secrets
- [ ] Deployment protection enabled (Vercel → Settings → Deployment Protection)

### Repository

- [ ] Security headers deployed via middleware
- [ ] Rate limiting active on /api/contact and /api/chat
- [ ] Turnstile verification on contact form
- [ ] Zod validation on all API routes
- [ ] Runtime env var checks in production
- [ ] Dependabot enabled (weekly)
- [ ] CodeQL scanning enabled
- [ ] Secret scanning enabled
- [ ] CI runs npm audit, lint, typecheck
- [ ] `.env*` files in .gitignore

### Monitoring

- [ ] Cloudflare Security Events notifications configured
- [ ] Vercel log drain configured (recommended)
- [ ] Alert rules set for rate-limit spikes and 5xx errors
