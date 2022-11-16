// Dependencies
import API from "./index";

// Types
import { Category, ResponseWithPagination, GetCategoriesQuery, ResponseBody } from "../interfaces";

const categoryApi = API.injectEndpoints({
	endpoints: build => ({
		getCategories: build.query<
			ResponseWithPagination<{ categories: Category[] }>,
			GetCategoriesQuery
		>({
			query: ({ page, q, sortBy }) => {
				const params = new URLSearchParams({
					page: page.toString(),
					q,
					sortBy: sortBy === "default" ? "" : sortBy
				});

				return `category?${params.toString()}`;
			},
			providesTags: ["Categories"]
		}),
		createCategory: build.mutation<ResponseBody<{ newCategory: Category }>, Partial<Category>>({
			query: newCategoryData => ({
				url: "category",
				method: "POST",
				body: newCategoryData
			}),
			invalidatesTags: ["Categories"]
		}),
		updateCategory: build.mutation<ResponseBody<{ updatedCategory: Category }>, Partial<Category>>({
			query: ({ id: categoryId, ...updatedCategoryData }) => ({
				url: `category/${categoryId}`,
				method: "PUT",
				body: updatedCategoryData
			}),
			invalidatesTags: ["Categories"]
		}),
		deleteCategory: build.mutation<ResponseBody<{ deletedCategory: Category }>, number>({
			query: categoryId => ({
				url: `category/${categoryId}`,
				method: "DELETE"
			}),
			invalidatesTags: ["Categories"]
		})
	}),
	overrideExisting: false
});

export const {
	useCreateCategoryMutation,
	useGetCategoriesQuery,
	useUpdateCategoryMutation,
	useDeleteCategoryMutation
} = categoryApi;

export default categoryApi;
