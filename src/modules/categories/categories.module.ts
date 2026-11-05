import { Module } from "@nestjs/common"

import { CategoriesCacheService } from "./cache/categories.cache.service"
import { CategoriesController } from "./categories.controller"
import { CategoriesRepository } from "./categories.repository"
import { CategoriesService } from "./categories.service"

@Module({
	controllers: [CategoriesController],
	providers: [CategoriesService, CategoriesRepository, CategoriesCacheService]
})
export class CategoriesModule {}
