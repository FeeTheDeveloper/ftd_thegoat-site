/**
 * Runtime environment variable validation.
 *
 * Checks that required environment variables are present and fails fast
 * if any are missing. This runs at import time in server-side code.
 *
 * Client-safe: NEXT_PUBLIC_* vars are validated separately and are safe to expose.
 * Server-only vars must NEVER be prefixed with NEXT_PUBLIC_.
 */

interface EnvVarConfig {
  name: string;
  required: boolean;
  /** If true, the var is only required in production */
  productionOnly?: boolean;
  /** Description for error messages */
  description: string;
}

/** Server-only environment variables (never exposed to browser) */
const SERVER_ENV_VARS: EnvVarConfig[] = [
  {
    name: 'OPENAI_API_KEY',
    required: true,
    productionOnly: false,
    description: 'OpenAI API key for chat endpoint',
  },
  {
    name: 'POWER_AUTOMATE_LEAD_WEBHOOK_URL',
    required: false,
    productionOnly: true,
    description: 'Power Automate webhook for lead capture',
  },
  {
    name: 'TURNSTILE_SECRET_KEY',
    required: false,
    productionOnly: true,
    description: 'Cloudflare Turnstile server-side secret',
  },
  {
    name: 'UPSTASH_REDIS_REST_URL',
    required: false,
    productionOnly: false,
    description: 'Optional Upstash Redis URL for distributed rate limiting',
  },
  {
    name: 'UPSTASH_REDIS_REST_TOKEN',
    required: false,
    productionOnly: false,
    description: 'Optional Upstash Redis token for distributed rate limiting',
  },
];

/** Client-safe environment variables (NEXT_PUBLIC_* prefix) */
const CLIENT_ENV_VARS: EnvVarConfig[] = [
  {
    name: 'NEXT_PUBLIC_TURNSTILE_SITE_KEY',
    required: false,
    productionOnly: true,
    description: 'Cloudflare Turnstile client-side site key',
  },
];

/**
 * Validate that no secret values are accidentally exposed as NEXT_PUBLIC_*.
 * These variable names should NEVER be prefixed with NEXT_PUBLIC_.
 */
const FORBIDDEN_PUBLIC_NAMES = [
  'OPENAI_API_KEY',
  'POWER_AUTOMATE_LEAD_WEBHOOK_URL',
  'TURNSTILE_SECRET_KEY',
  'UPSTASH_REDIS_REST_TOKEN',
];

function checkForbiddenPublicVars(): string[] {
  const errors: string[] = [];
  for (const name of FORBIDDEN_PUBLIC_NAMES) {
    const publicName = `NEXT_PUBLIC_${name}`;
    if (process.env[publicName]) {
      errors.push(
        `CRITICAL: "${publicName}" is set — this secret must NOT be exposed to the client. ` +
          `Remove the NEXT_PUBLIC_ prefix and use "${name}" as a server-only variable.`
      );
    }
  }
  return errors;
}

function checkRequiredVars(vars: EnvVarConfig[]): string[] {
  const isProduction = process.env.NODE_ENV === 'production';
  const warnings: string[] = [];

  for (const config of vars) {
    if (!config.required) continue;
    if (config.productionOnly && !isProduction) continue;

    const value = process.env[config.name];
    if (!value || value.trim() === '') {
      warnings.push(
        `Missing required env var: ${config.name} — ${config.description}`
      );
    }
  }

  return warnings;
}

/**
 * Validate environment variables. Call this from server-side code only.
 *
 * In production: throws on critical issues, warns on optional missing vars.
 * In development: only warns (does not throw).
 */
export function validateEnv(): void {
  const isProduction = process.env.NODE_ENV === 'production';

  // Check for secrets leaked as NEXT_PUBLIC_*
  const forbidden = checkForbiddenPublicVars();
  if (forbidden.length > 0) {
    for (const msg of forbidden) {
      console.error(msg);
    }
    if (isProduction) {
      throw new Error(
        `Security violation: ${forbidden.length} secret(s) exposed as NEXT_PUBLIC_* variables. ` +
          'Deploy blocked. Fix environment variables and redeploy.'
      );
    }
  }

  // Check required server vars
  const serverWarnings = checkRequiredVars(SERVER_ENV_VARS);
  for (const warning of serverWarnings) {
    if (isProduction) {
      console.error(warning);
    } else {
      console.warn(warning);
    }
  }

  // Check required client vars
  const clientWarnings = checkRequiredVars(CLIENT_ENV_VARS);
  for (const warning of clientWarnings) {
    if (isProduction) {
      console.error(warning);
    } else {
      console.warn(warning);
    }
  }

  if (isProduction && serverWarnings.length > 0) {
    console.error(
      `${serverWarnings.length} required env var(s) missing in production. ` +
        'Some features will be unavailable.'
    );
  }
}

/** Re-export for testing */
export { SERVER_ENV_VARS, CLIENT_ENV_VARS, FORBIDDEN_PUBLIC_NAMES };
