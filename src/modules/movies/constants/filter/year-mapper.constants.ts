import type { Prisma } from "@orm/generated/client"
import { YearFilter } from "@qb1tycinema/contracts/gen/movie"

export const YEAR_MAPPER = (
	fullYear: number
): Record<number, Prisma.MoviesWhereInput> => ({
	[YearFilter.YEAR_FILTER_THIS_YEAR]: { releaseYear: fullYear },
	[YearFilter.YEAR_FILTER_LAST_YEAR]: { releaseYear: fullYear - 1 },
	[YearFilter.YEAR_FILTER_RETRO]: { releaseYear: { lt: 2010 } }
})
