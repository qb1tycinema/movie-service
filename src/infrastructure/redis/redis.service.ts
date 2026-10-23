import {
	Injectable,
	Logger,
	OnModuleDestroy,
	OnModuleInit
} from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import Redis from "ioredis"

@Injectable()
export class RedisService
	extends Redis
	implements OnModuleInit, OnModuleDestroy
{
	private readonly logger = new Logger(RedisService.name)

	public constructor(private readonly configService: ConfigService) {
		super({
			username: configService.get("redis.user"),
			password: configService.get("redis.password"),
			host: configService.get("redis.host"),
			port: configService.get("redis.port"),
			maxRetriesPerRequest: 5,
			enableOfflineQueue: true
		})
	}

	public async onModuleInit() {
		const start = Date.now()

		this.logger.log("Initializing Redis connect")

		this.on("connect", () => {
			this.logger.log("Connecting to Redis")
		})

		this.on("ready", () => {
			const ms = Date.now() - start
			this.logger.log(`Redis connection established (time=${ms}ms)`)
		})

		this.on("error", error => {
			this.logger.error("Failed to connect to redis: ", {
				error: error.message ?? error
			})
		})

		this.on("close", () => {
			this.logger.warn("Redis connection close")
		})

		this.on("reconnecting", () => {
			this.logger.log("Redis reconnecting")
		})
	}

	public async onModuleDestroy() {
		this.logger.log("Closing Redis connection")

		try {
			await this.quit()

			this.logger.log("Redis connection closed")
		} catch (error) {
			this.logger.error("Error closing redis connection: ", error)
		}
	}
}
