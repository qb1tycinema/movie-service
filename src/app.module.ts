import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { LoggerModule } from "nestjs-pino"

import { configuration } from "./config"
import { getPinoConfig } from "./config/factories"
import { PrismaModule } from "./infrastructure/prisma/prisma.module"
import { RedisModule } from "./infrastructure/redis/redis.module"

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: [
				`.env.${process.env.NODE_ENV}.local`,
				`.env.${process.env.NODE_ENV}`,
				`.env`
			],
			load: [configuration],
			expandVariables: true
		}),
		LoggerModule.forRootAsync({
			useFactory: getPinoConfig,
			inject: [ConfigService]
		}),
		PrismaModule,
		RedisModule
	]
})
export class AppModule {}
