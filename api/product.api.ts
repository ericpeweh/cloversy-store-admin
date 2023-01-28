// Dependencies
import API from "./index";

// Types
import {
	Product,
	ResponseWithPagination,
	ResponseBody,
	GetProductsQuery,
	UpdateProductBody
} from "../interfaces";

const productApi = API.injectEndpoints({
	endpoints: build => ({
		getProducts: build.query<ResponseWithPagination<{ products: Product[] }>, GetProductsQuery>({
			query: ({ page, q, statusFilter, sortBy, brandFilter }) => {
				const params = new URLSearchParams({
					page: page.toString(),
					q,
					status: statusFilter === "default" ? "" : statusFilter,
					sortBy: sortBy === "default" ? "" : sortBy,
					brand: brandFilter === -1 ? "" : brandFilter + ""
				});

				return `products?${params.toString()}`;
			},
			providesTags: ["Products"]
		}),
		getProductDetail: build.query<
			ResponseBody<{ product: Product }>,
			{
				productId: string | string[] | undefined;
				salesAnalyticYear: string;
				visitorAnalyticYear: string;
			}
		>({
			query: ({ productId, salesAnalyticYear, visitorAnalyticYear }) => {
				const params = new URLSearchParams({
					sales_analytic_year: salesAnalyticYear,
					visitor_analytic_year: visitorAnalyticYear
				});

				return `products/${productId}?${params.toString()}`;
			},
			providesTags: res => [{ type: "Product", id: res?.data.product.id }]
		}),
		createProduct: build.mutation<ResponseBody<{ newProduct: Product }>, FormData>({
			query: newCategoryData => ({
				url: "products",
				method: "POST",
				body: newCategoryData
			}),
			invalidatesTags: ["Products"]
		}),
		updateProduct: build.mutation<
			ResponseBody<{ updatedProduct: Product }>,
			{ updatedProductData: FormData; productId: number }
		>({
			query: ({ productId, updatedProductData }) => ({
				url: `products/${productId}`,
				method: "PUT",
				body: updatedProductData
			}),
			invalidatesTags: res => [{ type: "Product", id: res?.data.updatedProduct.id }, "Products"]
		})
	}),
	overrideExisting: false
});

export const {
	useCreateProductMutation,
	useGetProductsQuery,
	useGetProductDetailQuery,
	useUpdateProductMutation
} = productApi;

export default productApi;
