export type ReviewsStatusValues = "default" | "active" | "disabled";

export type ReviewsSortValues = "default" | "status" | "rating" | "created_at";

export interface GetReviewsQuery {
	page: number;
	statusFilter: ReviewsStatusValues;
	sortBy: string;
	q: string;
}
