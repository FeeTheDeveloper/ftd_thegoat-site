/**
 * Rate limiter compatible with Vercel serverless functions.
 *
 * Uses in-memory storage by default (per-instance, resets on cold start).
 * Optionally uses Upstash Redis for production-grade distributed rate limiting.
 *
 * Usage:
 *   const limiter = createRateLimiter({ windowMs: 60_000, max: 5 });
 *   const result = limiter.check(ip);
 *   if (!result.allowed) { return 429 response; }
 */

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

interface RateLimitStore {
  check(key: string, windowMs: number, max: number): Promise<RateLimitResult>;
}

interface RateLimiterOptions {
  /** Time window in milliseconds */
  windowMs: number;
  /** Maximum requests per window */
  max: number;
  /** Optional key prefix for Redis */
  prefix?: string;
}

// ---------------------------------------------------------------------------
// In-Memory Store (default — per serverless instance)
// ---------------------------------------------------------------------------

interface MemoryEntry {
  count: number;
  resetAt: number;
}

class MemoryStore implements RateLimitStore {
  private store = new Map<string, MemoryEntry>();
  private cleanupInterval: ReturnType<typeof setInterval> | null = null;

  constructor() {
    // Periodic cleanup to prevent memory leaks in long-lived instances
    this.cleanupInterval = setInterval(() => this.cleanup(), 60_000);
  }

  async check(key: string, windowMs: number, max: number): Promise<RateLimitResult> {
    const now = Date.now();
    const entry = this.store.get(key);

    if (!entry || now >= entry.resetAt) {
      const resetAt = now + windowMs;
      this.store.set(key, { count: 1, resetAt });
      return { allowed: true, remaining: max - 1, resetAt };
    }

    entry.count += 1;
    const allowed = entry.count <= max;
    return {
      allowed,
      remaining: Math.max(0, max - entry.count),
      resetAt: entry.resetAt,
    };
  }

  private cleanup() {
    const now = Date.now();
    for (const [key, entry] of this.store) {
      if (now >= entry.resetAt) {
        this.store.delete(key);
      }
    }
  }

  destroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
  }
}

// ---------------------------------------------------------------------------
// Upstash Redis Store (optional — production-grade distributed rate limiting)
// ---------------------------------------------------------------------------

class UpstashStore implements RateLimitStore {
  private url: string;
  private token: string;

  constructor(url: string, token: string) {
    this.url = url;
    this.token = token;
  }

  async check(key: string, windowMs: number, max: number): Promise<RateLimitResult> {
    const now = Date.now();
    const windowKey = `ratelimit:${key}:${Math.floor(now / windowMs)}`;
    const resetAt = (Math.floor(now / windowMs) + 1) * windowMs;

    try {
      const response = await fetch(`${this.url}/pipeline`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          ['INCR', windowKey],
          ['PEXPIRE', windowKey, String(windowMs)],
        ]),
      });

      if (!response.ok) {
        // Fail open on Redis errors — don't block legitimate users
        console.error(`Upstash rate limit error: ${response.status}`);
        return { allowed: true, remaining: max, resetAt };
      }

      const results = (await response.json()) as { result: number }[];
      const count = results[0]?.result ?? 1;
      const allowed = count <= max;

      return {
        allowed,
        remaining: Math.max(0, max - count),
        resetAt,
      };
    } catch (error) {
      // Fail open — don't block users if Redis is down
      console.error('Upstash rate limit error:', error);
      return { allowed: true, remaining: max, resetAt };
    }
  }
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

function createStore(): RateLimitStore {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (redisUrl && redisToken) {
    return new UpstashStore(redisUrl, redisToken);
  }

  return new MemoryStore();
}

// Singleton store instance (shared across function invocations in same instance)
let storeInstance: RateLimitStore | null = null;

function getStore(): RateLimitStore {
  if (!storeInstance) {
    storeInstance = createStore();
  }
  return storeInstance;
}

export function createRateLimiter(options: RateLimiterOptions) {
  const { windowMs, max, prefix = '' } = options;

  return {
    async check(identifier: string): Promise<RateLimitResult> {
      const key = prefix ? `${prefix}:${identifier}` : identifier;
      return getStore().check(key, windowMs, max);
    },
  };
}

export type { RateLimitResult, RateLimiterOptions };
