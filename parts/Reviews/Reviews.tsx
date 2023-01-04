// Dependencies
import React, { useState } from "react";
import { useRouter } from "next/router";

// Styles
import { ReviewsContainer, ReviewsHeader, ReviewsList } from "./Reviews.styles";

// Icons
import AddIcon from "@mui/icons-material/Add";
import SortIcon from "@mui/icons-material/Sort";

// Hooks
import useMenu from "../../hooks/useMenu";
import usePagination from "../../hooks/usePagination";
import useSelector from "../../hooks/useSelector";
import useDebounce from "../../hooks/useDebounce";
import { useGetAllReviewsQuery } from "../../api/review.api";

// Types
import { ReviewsStatusValues, ReviewsSortValues } from "../../interfaces";
import { Alert, SelectChangeEvent } from "@mui/material";

// Utils
import { formatDateFullMonth } from "../../utils/formatDate";

// Components
import { CircularProgress, Grid, Stack, Typography, Snackbar } from "@mui/material";
import PageTitle from "../../components/PageTitle/PageTitle";
import Button from "../../components/Button/Button";
import SelectInput from "../../components/SelectInput/SelectInput";
import Menu from "../../components/Menu/Menu";
import Pagination from "../../components/Pagination/Pagination";
import FallbackContainer from "../../components/FallbackContainer/FallbackContainer";
import BoxButton from "../../components/BoxButton/BoxButton";
import ReviewItem from "../../components/ReviewItem/ReviewItem";
import TextInput from "../../components/TextInput/TextInput";

const Reviews = () => {
	const isAuth = useSelector(state => state.auth.isAuth);
	const router = useRouter();
	const { page, onChange: paginationChangeHandler } = usePagination();
	const [sortBy, setSortBy] = useState<string>("id");
	const [searchInput, setSearchInput] = useState("");
	const searchQuery = useDebounce(searchInput, 500);
	const [statusFilter, setStatusFilter] = useState<ReviewsStatusValues>("default");
	const [successCopy, setSuccessCopy] = useState(false);

	const {
		data: reviewsData,
		isFetching: isGetReviewsLoading,
		isSuccess: isGetReviewsSuccess,
		error: getReviewsError,
		refetch: refetchReviews
	} = useGetAllReviewsQuery(
		{ q: searchQuery, page, statusFilter, sortBy },
		{
			skip: !isAuth
		}
	);
	const reviewsError: any = getReviewsError;
	const noDataFound = reviewsData?.data.reviews.length === 0;

	const searchQueryChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(e.target.value);
	};

	const sortByChangeHandler = (e: SelectChangeEvent<unknown>) => {
		setSortBy(e.target.value as ReviewsSortValues);
	};

	const statusFilterChangeHandler = (e: SelectChangeEvent<unknown>) => {
		setStatusFilter(e.target.value as ReviewsStatusValues);
	};

	const copyVoucherCodeHandler = async (voucherCode: string) => {
		await navigator.clipboard.writeText(voucherCode);
		setSuccessCopy(true);
	};

	const {
		anchorEl: voucherItemMenuAnchorEl,
		anchorElData: voucherItemMenuAnchorElData,
		closeHandler: voucherItemMenuCloseHandler,
		isMenuOpen: isVoucherItemMenuOpen,
		openHandler: voucherItemMenuOpenHandler
	} = useMenu();

	return (
		<ReviewsContainer>
			<Snackbar
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				open={successCopy}
				onClose={() => setSuccessCopy(false)}
				message="Voucher code copied!"
				key={"voucher_code_copy"}
				autoHideDuration={1500}
			/>

			<Stack direction="row" alignItems="center" justifyContent="space-between">
				<PageTitle>Reviews List</PageTitle>
				<Button
					startIcon={<AddIcon />}
					size="small"
					color="primary"
					onClick={() => router.push("/Reviews/new")}
				>
					New Voucher
				</Button>
			</Stack>
			<ReviewsHeader>
				<Stack
					direction="row"
					gap={2}
					sx={{
						width: "30rem",
						"@media screen and (max-width: 900px)": {
							width: "100%"
						}
					}}
				>
					<TextInput
						label=""
						placeholder="Search review..."
						id="search-review"
						size="small"
						value={searchInput}
						onChange={searchQueryChangeHandler}
					/>
				</Stack>
				<Stack
					direction="row"
					justifyContent="flex-end"
					gap={{ xs: 1, sm: 2 }}
					sx={{
						"@media screen and (max-width: 800px)": {
							flexDirection: "column"
						}
					}}
				>
					<SelectInput
						options={[
							{ label: "Show all", value: "default" },
							{ label: "Active", value: "active" },
							{ label: "Disabled", value: "disabled" }
						]}
						value={statusFilter}
						onChange={statusFilterChangeHandler}
						size="small"
						sx={{ width: { xs: "100%", md: "20rem" } }}
					/>
					<SelectInput
						startAdornment={<SortIcon sx={{ mr: 1 }} />}
						options={[
							{ label: "Default sorting", value: "id" },
							{ label: "Sort by status", value: "status" },
							{ label: "Sort by rating", value: "rating" },
							{ label: "Sort by latest", value: "created_at" }
						]}
						value={sortBy}
						onChange={sortByChangeHandler}
						size="small"
						sx={{ width: { xs: "100%", md: "20rem" } }}
					/>
				</Stack>
			</ReviewsHeader>
			<Menu
				anchorEl={voucherItemMenuAnchorEl}
				id="voucher-item-menu"
				isOpen={isVoucherItemMenuOpen}
				onClose={voucherItemMenuCloseHandler}
				items={[
					{
						label: "Lihat detail",
						action: () => router.push(`/Reviews/${voucherItemMenuAnchorElData?.code}`),
						id: "detail"
					},
					{
						label: "Edit item",
						action: () => router.push(`/Reviews/${voucherItemMenuAnchorElData?.code}/edit`),
						id: "edit"
					}
				]}
			/>
			{!isGetReviewsLoading && getReviewsError && (
				<FallbackContainer>
					<Alert severity="error">{reviewsError.data.message}</Alert>
					<BoxButton onClick={refetchReviews}>Try again</BoxButton>
				</FallbackContainer>
			)}
			{isGetReviewsLoading && (
				<FallbackContainer>
					<CircularProgress />
				</FallbackContainer>
			)}
			{!isGetReviewsLoading && isGetReviewsSuccess && noDataFound && (
				<FallbackContainer>
					<Alert severity="info">No review found!</Alert>
				</FallbackContainer>
			)}
			{!isGetReviewsLoading && isGetReviewsSuccess && reviewsData && !noDataFound && (
				<>
					<ReviewsList>
						<Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
							{reviewsData?.data.reviews.map(review => (
								<Grid item xs={12} xl={6} key={review.id}>
									<ReviewItem
										reviewData={review}
										openEditReviewBtn={true}
										showProductTitle={true}
									/>
								</Grid>
							))}
						</Grid>
					</ReviewsList>
					<Stack
						justifyContent="flex-end"
						direction="row"
						mt={4}
						sx={{
							"@media screen and (max-width: 800px)": {
								justifyContent: "center"
							}
						}}
					>
						<Pagination
							page={reviewsData?.page}
							onChange={paginationChangeHandler}
							count={reviewsData?.totalPages}
							shape="rounded"
							color="primary"
						/>
					</Stack>
				</>
			)}
		</ReviewsContainer>
	);
};

export default Reviews;
