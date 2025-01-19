import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./module/auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { InventoryModule } from './inventory/inventory.module';
import { InventoryModule } from './inventory/inventory.module';

const config = ConfigModule.forRoot({
	envFilePath: ".env",
	isGlobal: true,
});

@Module({
	imports: [
		config,
		TypeOrmModule.forRoot({
			type: "postgres",
			host: process.env.PSQL_HOST || "localhost",
			port: Number(process.env.PSQL_PORT) || 5432,
			username: process.env.PSQL_USER || "postgres",
			database: process.env.PSQL_DB || "postgres",
			entities: [],
			synchronize: process.env.NODE_ENV === "development",
			autoLoadEntities: true,
		}),
		AuthModule,
		InventoryModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
