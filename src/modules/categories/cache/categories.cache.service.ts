import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

import { CATEGORIES_CACHE_KEYS } from "./categories.cache.keys"
import { RedisService } from "@/infrastructure/redis/redis.service"

@Injectable()
export class CategoriesCacheService {
	private readonly CACHE_TTL: number

	public constructor(
		private readonly configService: ConfigService,
		private readonly redisService: RedisService
	) {
		this.CACHE_TTL = configService.get("cache.ttl")
	}

	public get<T = unknown>(key: string): Promise<T | null> {
		return this.redisService.getJson<T>(key)
	}

	public set(key: string, value: unknown): Promise<void> {
		return this.redisService.setJson(key, value, this.CACHE_TTL)
	}

	public getAll<T = unknown>(): Promise<T | null> {
		return this.get(CATEGORIES_CACHE_KEYS.all())
	}

	public setAll(value: unknown) {
		return this.set(CATEGORIES_CACHE_KEYS.all(), value)
	}
}
