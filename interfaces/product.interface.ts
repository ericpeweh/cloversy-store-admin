// Types

export interface Product {
	id: number;
	title: string;
	sku: string;
	price: number;
	status: "active" | "disabled";
	category_id: number;
	category: string;
	brand_id: number;
	brand: string;
	description: string;
	slug: string;
	created_at: string;
	modified_at: string;
	tags: string[];
	sizes: string[];
	image: string;
	images: string[];
	rating: string;
	review_count: string;
	reviews: ProductReviewItem[];
}

export interface ProductReviewItem {
	id: number;
	product_id: number;
	transaction_id: string;
	rating: string;
	description: string;
	status: string;
	full_name: string;
	profile_picture: string;
	created_at: string;
}

export type ProductStatusValues = "default" | "active" | "disabled";

export interface GetProductsQuery {
	page: number | string;
	statusFilter: ProductStatusValues;
	brandFilter: number;
	q: string;
	sortBy: string;
}

export type ProductsSortValues = "default" | "popularity" | "rating" | "";

export interface CreateProductBody extends Omit<Product, "images"> {
	images: File[];
}

export interface UpdateProductBody extends Omit<Product, "images"> {
	removedTagIds: number[];
	removedSizeIds: number[];
	images: File[];
	removedImageIds: number[];
}
