// Dependencies
import React from "react";

// Hooks
import {
	useCancelNotifMarketingMutation,
	useGetScheduledNotifMarketingsQuery
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

const ScheduledNotifMarketingsList = () => {
	const router = useRouter();
	const isAuth = useSelector(state => state.auth.isAuth);

	const {
		data: scheduledNotifMarketingsData,
		isFetching: isGetScheduledNotifMarketingsLoading,
		isSuccess: isGetScheduledNotifMarketingsSuccess,
		error: getScheduledNotifMarketingsError,
		refetch: refetchScheduledNotifMarketings
	} = useGetScheduledNotifMarketingsQuery(null, {
		skip: !isAuth
	});
	const scheduledNotifMarketingsError: any = getScheduledNotifMarketingsError;
	const noDataFound = scheduledNotifMarketingsData?.data.notifMarketings.length === 0;

	const {
		anchorEl: itemMenuAnchorEl,
		closeHandler: itemMenuCloseHandler,
		isMenuOpen: isItemMenuOpen,
		openHandler: itemMenuOpenHandler,
		anchorElData: menuElData
	} = useMenu();

	// Cancel notif marketing API
	const [
		cancelNotifMarketing,
		{
			isLoading: isCancelNotifMarketingLoading,
			error: cancelNotifMarketingErrorData,
			reset: resetCancelNotifMarketing
		}
	] = useCancelNotifMarketingMutation();
	const cancelNotifMarketingError: any = cancelNotifMarketingErrorData;

	const cancelNotifMarketingHandler = async (notifMarketingId: string) => {
		const res = await cancelNotifMarketing(notifMarketingId).unwrap();

		if (res.status === "success") {
			resetCancelNotifMarketing();
			itemMenuCloseHandler();
		}
	};

	return (
		<Grid item xs={12} md={6}>
			<Menu
				anchorEl={itemMenuAnchorEl}
				id="notif-marketing-menu"
				isOpen={isItemMenuOpen}
				onClose={itemMenuCloseHandler}
				items={[
					{
						label: "Lihat detail",
						action: () => router.push(`/marketing/notification/${menuElData?.id}`),
						id: "detail"
					},
					{
						label: "Edit item",
						action: () => router.push(`/marketing/notification/${menuElData?.id}/edit`),
						id: "edit"
					},
					{
						label: "Batalkan",
						action: () => cancelNotifMarketingHandler(menuElData?.id),
						id: "hapus"
					}
				]}
			/>
			<Section>
				<SectionTitle>Scheduled Notifications</SectionTitle>
				{!isGetScheduledNotifMarketingsLoading && scheduledNotifMarketingsError && (
					<FallbackContainer size="small">
						<Alert severity="error">
							{scheduledNotifMarketingsError?.data?.message ||
								"Error occured while fetching scheduled notification marketings."}
						</Alert>
						<BoxButton onClick={refetchScheduledNotifMarketings}>Try again</BoxButton>
					</FallbackContainer>
				)}
				{isGetScheduledNotifMarketingsLoading && (
					<FallbackContainer size="small">
						<CircularProgress />
					</FallbackContainer>
				)}
				{!isGetScheduledNotifMarketingsLoading &&
					isGetScheduledNotifMarketingsSuccess &&
					noDataFound && (
						<FallbackContainer size="small">
							<Alert severity="info">No scheduled notification marketing found!</Alert>
						</FallbackContainer>
					)}
				{!isGetScheduledNotifMarketingsLoading &&
					isGetScheduledNotifMarketingsSuccess &&
					scheduledNotifMarketingsData &&
					!noDataFound && (
						<ListContainer>
							{scheduledNotifMarketingsData.data.notifMarketings.map(data => (
								<Stack direction="column" key={data.id}>
									<ListItem>
										<Stack>
											<ListItemTitle>{data.title}</ListItemTitle>
											<ListItemText>
												<StatusBadge color="primary">{data.notification_code}</StatusBadge> |
												Targets:
												{"  "}
												{data.send_to === "all"
													? "All Subscriptions"
													: `${data.target_count} ${
															data.target_count > 1 ? "Subscriptions" : "Subscription"
													  }`}
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
									{isCancelNotifMarketingLoading && menuElData?.id === data.id && (
										<LinearProgress />
									)}
									{cancelNotifMarketingError && (
										<Alert severity="error">
											{cancelNotifMarketingError?.data?.message ||
												"Error occured while cancelling notification marketing."}
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

export default ScheduledNotifMarketingsList;
