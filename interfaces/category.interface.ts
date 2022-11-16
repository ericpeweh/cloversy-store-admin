// Types

export interface Category {
	id: number;
	name: string;
	description: string;
	identifier: string;
	created_at: string;
	modified_at: string;
	product_amount?: string;
}

export interface GetCategoriesQuery {
	page: number;
	q: string;
	sortBy: string;
}

export type CategoriesSortValues = "product_amount" | "a-z" | "z-a" | "";
