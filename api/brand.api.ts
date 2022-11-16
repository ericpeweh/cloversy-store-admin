// Dependencies
import API from "./index";

// Types
import { Brand, ResponseWithPagination, GetBrandsQuery, ResponseBody } from "../interfaces";

const brandApi = API.injectEndpoints({
	endpoints: build => ({
		getBrands: build.query<ResponseWithPagination<{ brands: Brand[] }>, GetBrandsQuery>({
			query: ({ page, q, sortBy }) => {
				const params = new URLSearchParams({
					page: page.toString(),
					q,
					sortBy: sortBy === "default" ? "" : sortBy
				});

				return `brands?${params.toString()}`;
			},
			providesTags: ["Brands"]
		}),
		createBrand: build.mutation<ResponseBody<{ newBrand: Brand }>, Partial<Brand>>({
			query: newBrandData => ({
				url: "brands",
				method: "POST",
				body: newBrandData
			}),
			invalidatesTags: ["Brands"]
		}),
		updateBrand: build.mutation<ResponseBody<{ updatedBrand: Brand }>, Partial<Brand>>({
			query: ({ id: brandId, ...updatedBrandData }) => ({
				url: `brands/${brandId}`,
				method: "PUT",
				body: updatedBrandData
			}),
			invalidatesTags: ["Brands"]
		}),
		deleteBrand: build.mutation<ResponseBody<{ deletedBrand: Brand }>, number>({
			query: brandId => ({
				url: `brands/${brandId}`,
				method: "DELETE"
			}),
			invalidatesTags: ["Brands"]
		})
	}),
	overrideExisting: false
});

export const {
	useCreateBrandMutation,
	useGetBrandsQuery,
	useUpdateBrandMutation,
	useDeleteBrandMutation
} = brandApi;

export default brandApi;
