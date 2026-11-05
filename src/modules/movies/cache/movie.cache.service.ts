import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import type { ListMoviesRequest } from "@qb1tycinema/contracts/gen/movie"

import { MOVIE_CACHE_KEYS } from "./movie.cache.keys"
import { RedisService } from "@/infrastructure/redis/redis.service"

@Injectable()
export class MovieCacheService {
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

	public getAll<T = unknown>(params: ListMoviesRequest): Promise<T | null> {
		return this.get(MOVIE_CACHE_KEYS.all(params))
	}

	public setAll(params: ListMoviesRequest, value: unknown) {
		return this.set(MOVIE_CACHE_KEYS.all(params), value)
	}
}
