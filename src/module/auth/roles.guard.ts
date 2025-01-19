import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRole } from "./dto/login.dto";
import { ROLES_KEY } from "./roles.decorator";

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private reflector: Reflector) {}
	canActivate(context: ExecutionContext): boolean {
		const { user } = context.switchToHttp().getRequest();
		const requiredRoles = this.reflector.getAllAndMerge<UserRole[]>(
			ROLES_KEY,
			[context.getHandler(), context.getClass()],
		);
		if (!requiredRoles || requiredRoles.length === 0) {
			return true;
		}
		return requiredRoles.includes(user.role);
	}
}
