import { Injectable } from "@nestjs/common"
import type {
	Category,
	CreateCategoryRequest
} from "@qb1tycinema/contracts/gen/category"

import { CategoriesCacheService } from "./cache/categories.cache.service"
import { CategoriesRepository } from "./categories.repository"

@Injectable()
export class CategoriesService {
	public constructor(
		private readonly categoryRepository: CategoriesRepository,
		private readonly cacheService: CategoriesCacheService
	) {}

	public async getAll() {
		const cached = await this.cacheService.getAll<Category[]>()

		if (cached) {
			return {
				categories: cached
			}
		}

		const categories: Category[] = await this.categoryRepository.findAll()

		await this.cacheService.setAll(categories)

		return { categories }
	}

	public async createCategory(data: CreateCategoryRequest) {
		const category = await this.categoryRepository.create(data)

		return { category }
	}
}
