import { Controller } from "@nestjs/common"
import { GrpcMethod } from "@nestjs/microservices"
import type {
	CreateCategoryRequest,
	CreateCategoryResponse,
	GetAllCategoriesResponse
} from "@qb1tycinema/contracts/gen/category"

import { CategoriesService } from "./categories.service"

@Controller()
export class CategoriesController {
	public constructor(private readonly categoriesService: CategoriesService) {}

	@GrpcMethod("CategoryService", "GetAllCategories")
	public async getAll(): Promise<GetAllCategoriesResponse> {
		return await this.categoriesService.getAll()
	}

	@GrpcMethod("CategoryService", "CreateCategory")
	public async create(
		data: CreateCategoryRequest
	): Promise<CreateCategoryResponse> {
		return await this.categoriesService.createCategory(data)
	}
}
