import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { QueryErrorFilter } from "./utilities/query.exception";
import * as compression from "compression";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalFilters(new QueryErrorFilter());
	app.use(compression());
	app.useGlobalPipes(new ValidationPipe());
	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
