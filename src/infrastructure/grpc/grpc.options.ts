import type { GrpcOptions } from "@nestjs/microservices"
import { PROTO_PATHS } from "@qb1tycinema/contracts"

export const grpcPackages: string[] = ["movie.v1", "category.v1"]
export const grpcProtoPaths: string[] = [
	PROTO_PATHS.MOVIE,
	PROTO_PATHS.CATEGORY
]
export const grpcLoader: NonNullable<GrpcOptions["options"]["loader"]> = {
	keepCase: false,
	longs: String,
	enums: String,
	defaults: true,
	oneofs: true
}
