import validationSchema from "./validation.schema"

export default () => {
	const parsed = validationSchema.safeParse(process.env)

	if (!parsed.success) {
		console.error("Invalid environment variables", parsed.error.format())
		process.exit(1)
	}

	const env = parsed.data

	return {
		app: {
			nodeEnv: env.NODE_ENV
		},
		grpc: {
			host: env.GRPC_HOST,
			port: env.GRPC_PORT
		},
		redis: {
			user: env.REDIS_USER,
			password: env.REDIS_PASSWORD,
			host: env.REDIS_HOST,
			port: env.REDIS_PORT
		},
		jaeger: {
			url: env.JAEGER_URL
		},
		logger: {
			level: env.LOGGER_LEVEL
		}
	}
}
