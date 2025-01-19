import {
	Body,
	Controller,
	Get,
	Post,
	Request,
	UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDTO, RegisterDTO, UserRole } from "./dto/login.dto";
import { AuthGuard } from "./auth.guard";
import { RoleGuard } from "./roles.guard";
import { Roles } from "./roles.decorator";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("register")
	async register(@Body() registerDTO: RegisterDTO) {
		return await this.authService.register(registerDTO);
	}

	@Post("login")
	async login(@Body() loginDTO: LoginDTO) {
		return await this.authService.login(loginDTO);
	}

	@UseGuards(AuthGuard, RoleGuard)
	@Get("profile")
	async profile(@Request() req) {
		return await this.authService.getProfile(req);
	}
}
