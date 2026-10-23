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
		database: {
			url: env.DATABASE_URL,
			user: env.DATABASE_USER,
			password: env.DATABASE_PASSWORD,
			host: env.DATABASE_HOST,
			port: env.DATABASE_PORT,
			name: env.DATABASE_NAME
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
