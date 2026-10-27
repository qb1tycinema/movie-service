import { Injectable } from "@nestjs/common"
import { Movies, Prisma } from "@orm/generated/client"
import type { ListMoviesRequest } from "@qb1tycinema/contracts/gen/movie"

import {
	AGE_MAPPER,
	CATEGORY_MAPPER,
	DURATION_MAPPER,
	YEAR_MAPPER
} from "./constants/filter"
import { DIRECTION_MAPPER, SORT_BY_MAPPER } from "./constants/sort"
import { PrismaService } from "@/infrastructure/prisma/prisma.service"

@Injectable()
export class MoviesRepository {
	public constructor(private readonly prisma: PrismaService) {}

	public async findAll(filter: ListMoviesRequest) {
		if (filter.random) {
			return this.prisma.$queryRaw<
				Movies[]
			>`SELECT * FROM movies ORDER BY RANDOM() LIMIT 1`
		}

		const where = this.buildWhere(filter)
		const orderBy = this.buildOrder(filter)
		const take = filter.limit && filter.limit > 0 ? filter.limit : undefined

		return this.prisma.movies.findMany({
			select: {
				id: true,
				title: true,
				slug: true,
				poster: true,
				ratingAge: true,
				releaseDate: true,
				category: {
					select: {
						id: true,
						title: true,
						slug: true
					}
				}
			},
			where,
			orderBy,
			take
		})
	}

	public async findBySlug(slug: string) {
		return this.prisma.movies.findUnique({
			where: { slug }
		})
	}

	public async findById(id: string) {
		return this.prisma.movies.findUnique({
			where: { id }
		})
	}

	private buildWhere(
		filter: ListMoviesRequest
	): Prisma.MoviesWhereInput | undefined {
		const now = new Date()
		const fullYear = now.getFullYear()
		const conditions: Prisma.MoviesWhereInput[] = []

		if (filter.category) {
			conditions.push(
				CATEGORY_MAPPER(now)[filter.category] ?? {
					category: { slug: filter.category }
				}
			)
		}

		if (filter.filterYear) {
			const yearCondition = YEAR_MAPPER(fullYear)[filter.filterYear]
			if (yearCondition) conditions.push(yearCondition)
		}

		if (filter.filterAge) {
			const ageCondition = AGE_MAPPER[filter.filterAge]
			if (ageCondition) conditions.push(ageCondition)
		}

		if (filter.filterDuration) {
			const durationCondition = DURATION_MAPPER[filter.filterDuration]
			if (durationCondition) conditions.push(durationCondition)
		}

		return conditions.length ? { AND: conditions } : undefined
	}

	private buildOrder(
		filter: ListMoviesRequest
	): Prisma.MoviesOrderByWithRelationInput {
		const direction = DIRECTION_MAPPER[filter.sortOrder] ?? "desc"
		const orderBy = SORT_BY_MAPPER(direction)[filter.sortBy]

		return orderBy ?? { releaseDate: direction }
	}
}
