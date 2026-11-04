import { Injectable } from "@nestjs/common"
import type { CreateCategoryRequest } from "@qb1tycinema/contracts/gen/category"

import { CategoriesRepository } from "./categories.repository"

@Injectable()
export class CategoriesService {
	public constructor(
		private readonly categoryRepository: CategoriesRepository
	) {}

	public async getAll() {
		const categories = await this.categoryRepository.findAll()

		return { categories }
	}

	public async createCategory(data: CreateCategoryRequest) {
		const category = await this.categoryRepository.create(data)

		return { category }
	}
}
