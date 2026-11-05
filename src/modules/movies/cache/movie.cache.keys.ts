import type { ListMoviesRequest } from "@qb1tycinema/contracts/gen/movie"

export const MOVIE_CACHE_KEYS = {
	all: (params: ListMoviesRequest) => {
		const queryParts = Object.entries(params)
			.filter(([_, value]) => {
				if (value === undefined || value === null || value === "")
					return false

				if (value === 0) return false

				if (typeof value === "string" && value.includes("UNSPECIFIED"))
					return false

				if (value === false) return false

				return true
			})
			.sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
			.map(([key, value]) => `${key}:${value}`)

		if (!queryParts.length) {
			return "movies:list:all"
		}

		return ["movies", "list", ...queryParts].join(":")
	},
	bySlug: (slug: string) => `movies:slug:${slug}`,
	byId: (id: string) => `movies:id:${id}`
}
