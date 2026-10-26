import { NestFactory } from "@nestjs/core"

import { SeedModule } from "./seed.module"
import { SeedService } from "./seed.service"

async function bootsrap() {
	const app = await NestFactory.createApplicationContext(SeedModule)

	const seedService = app.get(SeedService)

	try {
		await seedService.run()
	} catch (error) {
		console.error("Ошибка во время сидирования:", error)
		process.exit(1)
	} finally {
		await app.close()
	}
}

bootsrap()
