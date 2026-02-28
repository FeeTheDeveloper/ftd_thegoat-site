# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

- **Email**: security@feethedeveloper.com
- **Response SLA**: Acknowledged within 48 hours, triaged within 5 business days.
- **Do NOT** open a public GitHub issue for security vulnerabilities.

Include:
1. Description of the vulnerability
2. Steps to reproduce
3. Potential impact
4. Suggested fix (optional)

## Supported Versions

| Version | Supported |
| ------- | --------- |
| main    | Yes       |

## Security Measures

This repository implements the following security controls:

- **Security headers**: HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy via Next.js middleware
- **Rate limiting**: In-memory (with optional Upstash Redis adapter) on all public API endpoints
- **Bot protection**: Cloudflare Turnstile on public forms, Cloudflare Bot Fight Mode at the edge
- **Input validation**: Zod schema validation on all API routes
- **Secrets management**: No secrets in client code; runtime env var checks; least-privilege access
- **CI/CD security**: Dependabot, CodeQL scanning, npm audit, secret scanning
- **Cloudflare WAF**: Managed rules, rate limiting, and bot protection at the edge

## Incident Response

See [docs/SECURITY_PLAYBOOK.md](docs/SECURITY_PLAYBOOK.md) for the full incident response runbook.

### Quick Response Steps

1. **Contain**: Enable Cloudflare "Under Attack" mode if active exploitation
2. **Rotate**: Revoke and rotate all potentially compromised secrets via Vercel dashboard
3. **Investigate**: Review Cloudflare Security Events + Vercel function logs
4. **Remediate**: Patch the vulnerability, deploy, and verify
5. **Communicate**: Notify affected parties per legal requirements

## Dependency Policy

- Dependabot runs weekly for npm dependencies
- Critical/high vulnerabilities must be patched within 72 hours
- No paid dependencies are introduced without explicit approval
