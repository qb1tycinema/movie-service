import type { Prisma } from "@orm/generated/client"

export const CATEGORY_MAPPER = (
	now: Date
): Record<string, Prisma.MoviesWhereInput> => ({
	now: { releaseDate: { lte: now } },
	soon: { OR: [{ releaseDate: { gt: now } }, { releaseDate: null }] }
})
