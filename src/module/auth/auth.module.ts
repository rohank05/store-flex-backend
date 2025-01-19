import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SecurityUser } from "src/entities/security_user";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { RoleGuard } from "./roles.guard";

@Module({
	imports: [
		TypeOrmModule.forFeature([SecurityUser]),
		JwtModule.registerAsync({
			useFactory: async () => ({
				secret: process.env.JWT_SECRET,
				signOptions: { expiresIn: "1d" },
				global: true,
			}),
		}),
	],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
