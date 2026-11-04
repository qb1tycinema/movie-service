export class MovieMapper {
	public static toMovie(entity: any) {
		let grpcDate = undefined

		if (entity.releaseDate) {
			const ms = entity.releaseDate.getTime()
			grpcDate = {
				seconds: Math.floor(ms / 1000),
				nanos: (ms % 1000) * 1_000_000
			}
		}

		return {
			id: entity.id,
			title: entity.title,
			slug: entity.slug,
			poster: entity.poster,
			ratingAge: entity.ratingAge,
			releaseDate: grpcDate
		}
	}

	public static toMovieDetails(entity: any) {
		let grpcDate = undefined

		if (entity.releaseDate) {
			const ms = entity.releaseDate.getTime()
			grpcDate = {
				seconds: Math.floor(ms / 1000),
				nanos: (ms % 1000) * 1_000_000
			}
		}

		return {
			id: entity.id,
			title: entity.title,
			slug: entity.slug,
			description: entity.description,
			poster: entity.poster,
			banner: entity.banner,
			duration: entity.duration,
			ratingAge: entity.ratingAge,
			country: entity.country,
			releaseDate: grpcDate
		}
	}
}
