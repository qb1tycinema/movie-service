import type { Prisma } from "@orm/generated/client"
import { SortBy } from "@qb1tycinema/contracts/gen/movie"

export const SORT_BY_MAPPER = (
	direction: Prisma.SortOrder
): Record<number, Prisma.MoviesOrderByWithRelationInput> => ({
	[SortBy.SORT_BY_RELEASE_DATE]: { releaseDate: direction },
	[SortBy.SORT_BY_RELEASE_YEAR]: { releaseYear: direction }
})
