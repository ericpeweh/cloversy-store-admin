// Dependencies
import React from "react";

// Hooks
import {
	useCancelEmailMarketingMutation,
	useGetScheduledEmailMarketingsQuery
} from "../../../api/marketing.api";

import useSelector from "../../../hooks/useSelector";
import useMenu from "../../../hooks/useMenu";
import { useRouter } from "next/router";

// Styles
import {
	ListContainer,
	ListItem,
	ListItemText,
	ListItemTitle,
	Section
} from "../NotificationsCenter.styles";

// Utils
import { formatDateFullWithDay } from "../../../utils/formatDate";

// Icons
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

// Components
import { Alert, CircularProgress, Grid, LinearProgress, Stack } from "@mui/material";
import BoxButton from "../../../components/BoxButton/BoxButton";
import StatusBadge from "../../../components/StatusBadge/StatusBadge";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import FallbackContainer from "../../../components/FallbackContainer/FallbackContainer";
import Menu from "../../../components/Menu/Menu";

const ScheduledEmailMarketingsList = () => {
	const router = useRouter();
	const isAuth = useSelector(state => state.auth.isAuth);

	const {
		data: scheduledEmailMarketingsData,
		isFetching: isGetScheduledEmailMarketingsLoading,
		isSuccess: isGetScheduledEmailMarketingsSuccess,
		error: getScheduledEmailMarketingsError,
		refetch: refetchScheduledEmailMarketings
	} = useGetScheduledEmailMarketingsQuery(null, {
		skip: !isAuth
	});
	const scheduledEmailMarketingsError: any = getScheduledEmailMarketingsError;
	const noDataFound = scheduledEmailMarketingsData?.data.emailMarketings.length === 0;

	const {
		anchorEl: itemMenuAnchorEl,
		closeHandler: itemMenuCloseHandler,
		isMenuOpen: isItemMenuOpen,
		openHandler: itemMenuOpenHandler,
		anchorElData: menuElData
	} = useMenu();

	// Cancel email marketing API
	const [
		cancelEmailMarketing,
		{
			isLoading: isCancelEmailMarketingLoading,
			error: cancelEmailMarketingErrorData,
			reset: resetCancelEmailMarketing
		}
	] = useCancelEmailMarketingMutation();
	const cancelEmailMarketingError: any = cancelEmailMarketingErrorData;

	const cancelEmailMarketingHandler = async (emailMarketingId: string) => {
		const res = await cancelEmailMarketing(emailMarketingId).unwrap();

		if (res.status === "success") {
			resetCancelEmailMarketing();
			itemMenuCloseHandler();
		}
	};

	return (
		<Grid item xs={12} md={6}>
			<Menu
				anchorEl={itemMenuAnchorEl}
				id="email-marketing-menu"
				isOpen={isItemMenuOpen}
				onClose={itemMenuCloseHandler}
				items={[
					{
						label: "Lihat detail",
						action: () => router.push(`/marketing/email/${menuElData?.id}`),
						id: "detail"
					},
					{
						label: "Edit item",
						action: () => router.push(`/marketing/email/${menuElData?.id}/edit`),
						id: "edit"
					},
					{
						label: "Batalkan",
						action: () => cancelEmailMarketingHandler(menuElData?.id),
						id: "hapus"
					}
				]}
			/>
			<Section>
				<SectionTitle>Scheduled Email Marketings</SectionTitle>
				{!isGetScheduledEmailMarketingsLoading && scheduledEmailMarketingsError && (
					<FallbackContainer size="small">
						<Alert severity="error">
							{scheduledEmailMarketingsError?.data?.message ||
								"Error occured while fetching scheduled email marketings."}
						</Alert>
						<BoxButton onClick={refetchScheduledEmailMarketings}>Try again</BoxButton>
					</FallbackContainer>
				)}
				{isGetScheduledEmailMarketingsLoading && (
					<FallbackContainer size="small">
						<CircularProgress />
					</FallbackContainer>
				)}
				{!isGetScheduledEmailMarketingsLoading &&
					isGetScheduledEmailMarketingsSuccess &&
					noDataFound && (
						<FallbackContainer size="small">
							<Alert severity="info">No scheduled email marketing found!</Alert>
						</FallbackContainer>
					)}
				{!isGetScheduledEmailMarketingsLoading &&
					isGetScheduledEmailMarketingsSuccess &&
					scheduledEmailMarketingsData &&
					!noDataFound && (
						<ListContainer>
							{scheduledEmailMarketingsData.data.emailMarketings.map(data => (
								<Stack direction="column" key={data.id}>
									<ListItem>
										<Stack>
											<ListItemTitle>{data.title}</ListItemTitle>
											<ListItemText>
												<StatusBadge color="primary">{data.notification_code}</StatusBadge> |
												Targets:
												{"  "}
												{`${data.target_count} ${data.target_count > 1 ? "Customers" : "Customer"}`}
											</ListItemText>
											<ListItemText>
												<TimerOutlinedIcon />
												{formatDateFullWithDay(data?.scheduled || "")}
											</ListItemText>
										</Stack>
										<BoxButton onClick={e => itemMenuOpenHandler(e, data)}>
											<MoreHorizIcon />
										</BoxButton>
									</ListItem>
									{isCancelEmailMarketingLoading && menuElData?.id === data.id && (
										<LinearProgress />
									)}
									{cancelEmailMarketingError && (
										<Alert severity="error">
											{cancelEmailMarketingError?.data?.message ||
												"Error occured while cancelling email marketing."}
										</Alert>
									)}
								</Stack>
							))}
						</ListContainer>
					)}
			</Section>
		</Grid>
	);
};

export default ScheduledEmailMarketingsList;
