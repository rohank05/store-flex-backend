import {
	IsEmail,
	IsNotEmpty,
	IsPhoneNumber,
	IsString,
	IsStrongPassword,
} from "class-validator";

export enum UserRole {
	ADMIN = "admin",
	MANAGER = "manager",
	CASHIER = "cashier",
	INVENTORY_MANAGER = "inventory_manager",
}

export class RegisterDTO {
	@IsString()
	@IsNotEmpty()
	fullName: string;

	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsStrongPassword()
	@IsNotEmpty()
	password: string;

	@IsPhoneNumber()
	@IsNotEmpty()
	phoneNumber: string;

	role: UserRole;

	storeBranchId?: number;
}

export class LoginDTO {
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
	password: string;
}
