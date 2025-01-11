import { Catch, ConflictException } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { QueryFailedError } from "typeorm";

@Catch(QueryFailedError)
export class QueryErrorFilter extends BaseExceptionFilter {
	catch(exception: any, host: import("@nestjs/common").ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		if (exception.code === "23505") {
			const field = exception.detail.match(/\(\"?(.*?)\"?\)/)[1];
			return response
				.status(409)
				.json({ message: `This ${field} already exists` });
		}
	}
}
