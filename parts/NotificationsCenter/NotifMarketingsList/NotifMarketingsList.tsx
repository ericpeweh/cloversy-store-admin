// Dependencies
import React, { useState } from "react";

// Hooks
import { useGetNotifMarketingsQuery } from "../../../api/marketing.api";
import usePagination from "../../../hooks/usePagination";
import useDebounce from "../../../hooks/useDebounce";
import useSelector from "../../../hooks/useSelector";
import { useRouter } from "next/router";

// Styles
import { Section } from "../NotificationsCenter.styles";
import { TableCell, TableRow } from "../../../components/Table/Table.styles";

// Utils
import { formatDateStandardWithTime } from "../../../utils/formatDate";

// Components
import { Alert, CircularProgress, Grid, Stack } from "@mui/material";
import BoxButton from "../../../components/BoxButton/BoxButton";
import Pagination from "../../../components/Pagination/Pagination";
import StatusBadge from "../../../components/StatusBadge/StatusBadge";
import Table from "../../../components/Table/Table";
import TextInput from "../../../components/TextInput/TextInput";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import FallbackContainer from "../../../components/FallbackContainer/FallbackContainer";

const NotificationsHeadData = ["Sent at", "Code", "Campaign title", "Target", "Action"];

const NotifMarketingsList = () => {
	const router = useRouter();
	const isAuth = useSelector(state => state.auth.isAuth);
	const { page, onChange: paginationChangeHandler } = usePagination();
	const [searchInput, setSearchInput] = useState("");
	const searchQuery = useDebounce(searchInput, 500);

	const {
		data: notifMarketingsData,
		isFetching: isGetNotifMarketingsLoading,
		isSuccess: isGetNotifMarketingsSuccess,
		error: getNotifMarketingsError,
		refetch: refetchNotifMarketings
	} = useGetNotifMarketingsQuery(
		{ page, q: searchQuery },
		{
			skip: !isAuth
		}
	);
	const notifMarketingsError: any = getNotifMarketingsError;
	const noDataFound = notifMarketingsData?.data.notifMarketings.length === 0;

	const searchQueryChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(e.target.value);
	};

	return (
		<Grid item xs={12}>
			<Section>
				<Stack
					direction={{ xs: "column", sm: "row" }}
					justifyContent="space-between"
					alignItems={{ xs: "flex-start", sm: "center" }}
					sx={{ mb: 2 }}
					gap={{ xs: 1, sm: 0 }}
				>
					<SectionTitle>Notifications History</SectionTitle>
					<Stack direction="row" gap={2} sx={{ width: { xs: "100%", sm: "30rem" } }}>
						<TextInput
							label=""
							placeholder="Search notification..."
							id="search-notification"
							size="small"
							value={searchInput}
							onChange={searchQueryChangeHandler}
						/>
					</Stack>
				</Stack>

				{!isGetNotifMarketingsLoading && notifMarketingsError && (
					<FallbackContainer>
						<Alert severity="error">{notifMarketingsError.data.message}</Alert>
						<BoxButton onClick={refetchNotifMarketings}>Try again</BoxButton>
					</FallbackContainer>
				)}
				{isGetNotifMarketingsLoading && (
					<FallbackContainer>
						<CircularProgress />
					</FallbackContainer>
				)}
				{!isGetNotifMarketingsLoading && isGetNotifMarketingsSuccess && noDataFound && (
					<FallbackContainer>
						<Alert severity="info">No notification marketing found!</Alert>
					</FallbackContainer>
				)}
				{!isGetNotifMarketingsLoading &&
					isGetNotifMarketingsSuccess &&
					notifMarketingsData &&
					!noDataFound && (
						<>
							<Table headData={NotificationsHeadData}>
								{notifMarketingsData.data.notifMarketings.map(data => (
									<TableRow key={data.id}>
										<TableCell>{formatDateStandardWithTime(data.created_at)}</TableCell>
										<TableCell
											align="center"
											sx={{
												"& > p": {
													width: "max-content"
												}
											}}
										>
											<StatusBadge color="primary" sx={{ width: "max-content" }}>
												{data.notification_code}
											</StatusBadge>
										</TableCell>
										<TableCell>{data.title}</TableCell>
										<TableCell>
											{data.send_to === "all"
												? "All Subscriptions"
												: `${data.target_count} ${
														data.target_count > 1 ? "Subscriptions" : "Subscription"
												  }`}
										</TableCell>
										<TableCell>
											<Stack direction="row" gap={1}>
												<BoxButton
													onClick={() => router.push(`/marketing/notification/${data.id}`)}
												>
													Detail
												</BoxButton>
											</Stack>
										</TableCell>
									</TableRow>
								))}
							</Table>
							<Stack
								justifyContent="flex-end"
								direction="row"
								mt={{ xs: 3, md: 4 }}
								sx={{
									"@media screen and (max-width: 800px)": {
										justifyContent: "center"
									}
								}}
							>
								<Pagination
									page={page}
									onChange={paginationChangeHandler}
									count={notifMarketingsData?.totalPages || 1}
									shape="rounded"
									color="primary"
								/>
							</Stack>
						</>
					)}
			</Section>
		</Grid>
	);
};

export default NotifMarketingsList;
