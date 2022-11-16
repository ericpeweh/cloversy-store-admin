export interface Brand {
	id: number;
	name: string;
	identifier: string;
	created_at: string;
	modified_at: string;
	product_amount?: string;
}

export interface GetBrandsQuery {
	page: number;
	q: string;
	sortBy: string;
}

export type BrandsSortValues = "product_amount" | "a-z" | "z-a" | "";
