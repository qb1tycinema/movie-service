import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import path from "path"

import { PrismaModule } from "../prisma.module"

import { SeedService } from "./seed.service"
import { configuration } from "@/config"

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: [
				path.join(process.cwd(), `.env.${process.env.NODE_ENV}.local`),
				path.join(process.cwd(), `.env.${process.env.NODE_ENV}`),
				path.join(process.cwd(), ".env")
			],
			load: [configuration],
			expandVariables: true
		}),
		PrismaModule
	],
	providers: [SeedService]
})
export class SeedModule {}
