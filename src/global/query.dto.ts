export class QueryDTO {
	page: number;
	limit: number;
	sort: string;
	filter: FilterDTO[];
}

export class FilterDTO {
	fieldName: string;
	operator: string;
	value: string;
}
