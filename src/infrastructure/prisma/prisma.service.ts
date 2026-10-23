import {
	Injectable,
	Logger,
	OnModuleDestroy,
	OnModuleInit
} from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PrismaClient } from "@orm/generated/client"
import { PrismaPg } from "@prisma/adapter-pg"

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	private readonly logger = new Logger(PrismaService.name)

	public constructor(private readonly configService: ConfigService) {
		const adapter = new PrismaPg({
			user: configService.get("database.user"),
			password: configService.get("database.password"),
			host: configService.get("database.host"),
			port: configService.get("database.port"),
			database: configService.get("database.name")
		})

		super({ adapter })
	}

	public async onModuleInit() {
		const start = Date.now()

		this.logger.log("Connecting to Database")

		try {
			await this.$connect()

			const ms = Date.now() - start

			this.logger.log(`Database connection established (time=${ms}ms)`)
		} catch (error) {
			this.logger.error("Failed to connect to database: ", error)

			throw error
		}
	}

	public async onModuleDestroy() {
		this.logger.log("Disconnecting from database")

		try {
			await this.$disconnect()

			this.logger.log("Database connection closed")
		} catch (error) {
			this.logger.error("Failed to disconnect from database: ", error)

			throw error
		}
	}
}
