import { Controller, Post } from "@nestjs/common";
import { InventoryService } from "./inventory.service";
import { QueryDTO } from "src/global/query.dto";

@Controller("inventory")
export class InventoryController {
	constructor(private invertoryService: InventoryService) {}

	@Post()
	async getInventory(query: QueryDTO) {}
}
