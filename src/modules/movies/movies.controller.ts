import { Controller } from "@nestjs/common"

import { MoviesService } from "./movies.service"
import { GrpcMethod } from "@nestjs/microservices"
import type { GetMovieRequest, GetMovieResponse, ListMoviesRequest, ListMoviesResponse } from "@qb1tycinema/contracts/gen/movie"

@Controller()
export class MoviesController {
	constructor(private readonly moviesService: MoviesService) {}

	@GrpcMethod("MovieService", "ListMovies")
	public async list(data: ListMoviesRequest): Promise<ListMoviesResponse> {
		return await this.moviesService.getAll(data)
	}

	@GrpcMethod("MovieService", "GetMovie")
	public async getOne(data: GetMovieRequest): Promise<GetMovieResponse> {
		return await this.moviesService.getOne(data)
	}
}
