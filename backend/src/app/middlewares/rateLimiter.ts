import redis from 'redis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import AppError from '../exception/AppError';

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASS || undefined,
});

const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'ratelimit',
    points: 5,
    duration: 1,
});

export default async function rateLimiter(request, response, next) {
    try {
        const teste = await limiter.consume(request.ip);
        console.log(teste);
        console.log('ip', request.ip)

        return next();
    } catch (err) {
        throw new AppError('Too many requests', 429);
    }
}
