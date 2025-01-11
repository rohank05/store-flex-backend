import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SecurityUser {
	@PrimaryGeneratedColumn()
	id: number;
	@Column()
	fullName: string;
	@Column({ unique: true })
	email: string;
	@Column()
	password: string;
	@Column({ unique: true })
	phoneNumber: string;
	@Column()
	role: string;
	@Column({ default: 1 })
	storeBranchId?: number;
}
