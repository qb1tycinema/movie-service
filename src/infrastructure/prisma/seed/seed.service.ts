import { Injectable, Logger } from "@nestjs/common"
import { CATEGORIES, MOVIES } from "@orm/constants"

import { PrismaService } from "../prisma.service"

@Injectable()
export class SeedService {
	private readonly logger = new Logger(SeedService.name)

	public constructor(private readonly prisma: PrismaService) {}

	public async run() {
		this.logger.log("Начинаем запись данных в базу...")

		const categoryMap = new Map<string, string>()

		this.logger.log("Начинаем запись категории в базу...")

		for (const c of CATEGORIES) {
			const created = await this.prisma.categories.upsert({
				where: { slug: c.slug },
				update: {},
				create: c
			})

			categoryMap.set(c.slug, created.id)
		}

		this.logger.log("Начинаем запись фильмов в базу...")

		for (const m of MOVIES) {
			const { categorySlug, ...movie } = m

			await this.prisma.movies.upsert({
				where: { slug: movie.slug },
				update: {},
				create: {
					...movie,
					categoryId: categoryMap.get(categorySlug)!
				}
			})
		}

		this.logger.log("Успешно!")
	}
}
