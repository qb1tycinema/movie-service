import type { Prisma } from "@orm/generated/client"
import { SortOrder } from "@qb1tycinema/contracts/gen/movie"

export const DIRECTION_MAPPER: Record<number, Prisma.SortOrder> = {
	[SortOrder.SORT_ORDER_ASC]: "asc",
	[SortOrder.SORT_ORDER_DESK]: "desc"
}
