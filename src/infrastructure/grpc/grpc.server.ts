import type { INestApplication } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { type MicroserviceOptions, Transport } from "@nestjs/microservices"

import { grpcLoader, grpcPackages, grpcProtoPaths } from "./grpc.options"

export function createGrpcServer(app: INestApplication, config: ConfigService) {
	const host = config.get("grpc.host")
	const port = config.get("grpc.port")

	app.connectMicroservice<MicroserviceOptions>({
		transport: Transport.GRPC,
		options: {
			package: grpcPackages,
			protoPath: grpcProtoPaths,
			url: `${host}:${port}`,
			loader: grpcLoader
		}
	})
}
