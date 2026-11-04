import { Injectable } from "@nestjs/common"
import { Prisma } from "@orm/generated/client"

import { PrismaService } from "@/infrastructure/prisma/prisma.service"

@Injectable()
export class CategoriesRepository {
	public constructor(private readonly prisma: PrismaService) {}

	public async findAll() {
		return await this.prisma.categories.findMany({
			select: {
				id: true,
				title: true,
				slug: true
			},
			orderBy: {
				createdAt: "desc"
			}
		})
	}

	public async create(data: Prisma.CategoriesCreateInput) {
		return this.prisma.categories.create({
			data
		})
	}
}
