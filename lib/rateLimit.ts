import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const DAILY_LIMIT = 5;

export async function checkRateLimit(userId: string): Promise<{
  allowed: boolean;
  remaining: number;
  limit: number;
}> {
  const today = new Date().toISOString().split("T")[0];
  const key = `rate_limit:${userId}:${today}`;

  const count = await redis.incr(key);

  if (count === 1) {
    await redis.expire(key, 60 * 60 * 25);
  }

  const remaining = Math.max(0, DAILY_LIMIT - count);
  const allowed = count <= DAILY_LIMIT;

  return { allowed, remaining, limit: DAILY_LIMIT };
}

export async function getRemainingGenerations(userId: string): Promise<number> {
  const today = new Date().toISOString().split("T")[0];
  const key = `rate_limit:${userId}:${today}`;

  const count = await redis.get<number>(key);
  if (!count) return DAILY_LIMIT;

  return Math.max(0, DAILY_LIMIT - count);
}
