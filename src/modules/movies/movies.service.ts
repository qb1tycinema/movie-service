import { Injectable } from "@nestjs/common"
import { RpcException } from "@nestjs/microservices"
import { RpcStatus } from "@qb1tycinema/common"
import type {
	CreateMovieRequest,
	GetMovieRequest,
	GetMovieResponse,
	ListMoviesRequest,
	ListMoviesResponse
} from "@qb1tycinema/contracts/gen/movie"

import { MOVIE_CACHE_KEYS } from "./cache/movie.cache.keys"
import { MovieCacheService } from "./cache/movie.cache.service"
import { MovieMapper } from "./movie.mapper"
import { MoviesRepository } from "./movies.repository"

@Injectable()
export class MoviesService {
	public constructor(
		private readonly moviesRepository: MoviesRepository,
		private readonly movieCacheService: MovieCacheService
	) {}

	public async getAll(data: ListMoviesRequest) {
		const filter: ListMoviesRequest = {
			category: data.category ?? undefined,
			random: data.random === true,
			limit: data.limit > 0 ? data.limit : undefined,
			sortOrder: data.sortOrder ?? 0,
			sortBy: data.sortBy ?? 0,
			filterYear: data.filterYear ?? 0,
			filterAge: data.filterAge ?? 0,
			filterDuration: data.filterDuration ?? 0
		}

		const cached =
			await this.movieCacheService.getAll<ListMoviesResponse["movies"]>(
				filter
			)

		if (cached) {
			return { movies: cached }
		}

		const movies = await this.moviesRepository.findAll(filter)

		const result = movies.map(movie => MovieMapper.toMovie(movie))

		await this.movieCacheService.setAll(filter, result)

		return {
			movies: result
		}
	}

	public async getOne(data: GetMovieRequest) {
		const cacheKey = data.id
			? MOVIE_CACHE_KEYS.byId(data.id)
			: MOVIE_CACHE_KEYS.bySlug(data.slug)

		const cached =
			await this.movieCacheService.get<GetMovieResponse>(cacheKey)

		if (cached) {
			return cached
		}

		const movie = data.id
			? await this.moviesRepository.findById(data.id)
			: await this.moviesRepository.findBySlug(data.slug)

		if (!movie) {
			throw new RpcException({
				details: "Movie not found",
				code: RpcStatus.NOT_FOUND
			})
		}

		const response: GetMovieResponse = {
			movie: MovieMapper.toMovieDetails(movie)
		}

		await this.movieCacheService.set(cacheKey, response)

		return response
	}

	public async create(data: CreateMovieRequest) {
		const movie = await this.moviesRepository.create(data)

		return {
			movie: MovieMapper.toMovieDetails(movie)
		}
	}
}
