import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SecurityUser } from "src/entities/security_user";
import { Repository } from "typeorm";
import { LoginDTO, RegisterDTO } from "./dto/login.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(SecurityUser)
		private securityUserRespository: Repository<SecurityUser>,
		private jwtService: JwtService,
	) {}

	async register(registerDTO: RegisterDTO) {
		registerDTO.password = bcrypt.hashSync(
			registerDTO.password,
			bcrypt.genSaltSync(),
		);
		const user = await this.securityUserRespository.save(registerDTO);
		delete user.password;
		return user;
	}

	async login(loginDTO: LoginDTO) {
		const user = await this.securityUserRespository.findOne({
			where: { email: loginDTO.email },
		});
		if (!user) {
			throw new UnauthorizedException("Invalid credentials");
		}
		if (!bcrypt.compareSync(loginDTO.password, user.password)) {
			throw new UnauthorizedException("Invalid credentials");
		}
		const payload = {
			email: user.email,
			role: user.role,
			name: user.fullName,
		};
		return { accessToken: await this.jwtService.signAsync(payload) };
	}
}
