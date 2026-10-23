import { z } from "zod"

export enum Environemt {
	Development = "development",
	Production = "production",
	Test = "test"
}

export default z.object({
	NODE_ENV: z.enum(Environemt).default(Environemt.Development),

	GRPC_HOST: z.string().nonempty(),
	GRPC_PORT: z.coerce.number(),

	REDIS_USER: z.string().nonempty(),
	REDIS_PASSWORD: z.string().nonempty(),
	REDIS_HOST: z.string().nonempty(),
	REDIS_PORT: z.coerce.number(),

	JAEGER_URL: z.string().nonempty(),

	LOGGER_LEVEL: z.string().nonempty()
})
