import { Injectable } from "@nestjs/common"
import { RpcException } from "@nestjs/microservices"
import { RpcStatus } from "@qb1tycinema/common"
import type {
	CreateMovieRequest,
	GetMovieRequest,
	ListMoviesRequest
} from "@qb1tycinema/contracts/gen/movie"

import { MovieMapper } from "./movie.mapper"
import { MoviesRepository } from "./movies.repository"

@Injectable()
export class MoviesService {
	public constructor(private readonly moviesRepository: MoviesRepository) {}

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

		const movies = await this.moviesRepository.findAll(filter)

		return {
			movies: movies.map(movie => MovieMapper.toMovie(movie))
		}
	}

	public async getOne(data: GetMovieRequest) {
		const movie = data.id
			? await this.moviesRepository.findById(data.id)
			: await this.moviesRepository.findBySlug(data.slug)

		if (!movie) {
			throw new RpcException({
				details: "Movie not found",
				code: RpcStatus.NOT_FOUND
			})
		}

		return {
			movie: MovieMapper.toMovieDetails(movie)
		}
	}

	public async create(data: CreateMovieRequest) {
		const movie = await this.moviesRepository.create(data)

		return {
			movie: MovieMapper.toMovieDetails(movie)
		}
	}
}
