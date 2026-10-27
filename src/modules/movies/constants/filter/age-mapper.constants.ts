import type { Prisma } from "@orm/generated/client"
import { AgeFilter } from "@qb1tycinema/contracts/gen/movie"

export const AGE_MAPPER: Record<number, Prisma.MoviesWhereInput> = {
	[AgeFilter.AGE_FILTER_FAMILY]: { ratingAge: { lte: 12 } },
	[AgeFilter.AGE_FILTER_ADULT]: { ratingAge: { gte: 18 } }
}
