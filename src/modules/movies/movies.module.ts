import { Module } from "@nestjs/common"

import { MovieCacheService } from "./cache/movie.cache.service"
import { MoviesController } from "./movies.controller"
import { MoviesRepository } from "./movies.repository"
import { MoviesService } from "./movies.service"

@Module({
	controllers: [MoviesController],
	providers: [MoviesService, MoviesRepository, MovieCacheService]
})
export class MoviesModule {}
