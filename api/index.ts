// Dependencies
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Types
import { RootState } from "../store";

export const BASE_URL =
	process.env.NODE_ENV === "development"
		? "http://localhost:5000/admin"
		: "https://api.cloversy.id/admin";

export const API = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).auth.token;
			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}
			return headers;
		}
	}),
	tagTypes: [
		"Categories",
		"Brands",
		"Customers",
		"Customer",
		"Vouchers",
		"Voucher",
		"Products",
		"Product",
		"Transactions",
		"Transaction",
		"Transaction Edit",
		"Reviews",
		"Review",
		"Push Subscriptions",
		"Notif Marketings",
		"Scheduled Notif Marketings",
		"Notif Marketing",
		"Notifications",
		"Notification",
		"Email Templates",
		"Email Marketings",
		"Scheduled Email Marketings",
		"Email Marketing",
		"Dashboard"
	],
	endpoints: () => ({})
});

export default API;
