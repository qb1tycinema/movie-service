import type { Prisma } from "@orm/generated/client"
import { DurationFilter } from "@qb1tycinema/contracts/gen/movie"

export const DURATION_MAPPER: Record<number, Prisma.MoviesWhereInput> = {
	[DurationFilter.DURATION_FILTER_SHORT]: { duration: { lte: 90 } },
	[DurationFilter.DURATION_FILTER_LONG]: { duration: { gte: 120 } }
}
