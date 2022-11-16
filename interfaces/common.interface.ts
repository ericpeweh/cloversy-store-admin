export interface PaginationData {
	page: number;
	pageSize: number;
	totalCount: number;
	totalPages: number;
}

export interface ResponseBody<T> {
	status: "success" | "error";
	error?: string;
	data: T;
}

export type ResponseWithPagination<T> = ResponseBody<T> & PaginationData;
