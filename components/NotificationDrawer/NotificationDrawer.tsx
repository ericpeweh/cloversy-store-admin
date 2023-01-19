// Dependencies
import React, { useEffect, useState } from "react";

// Styles
import {
	NotificationActionButtons,
	NotificationDrawerContainer,
	NotificationItem,
	NotificationItemContent,
	NotificationItemImage,
	NotificationLists,
	HideNotificationButton
} from "./NotificationDrawer.styles";

// Hooks
import { useRouter } from "next/router";
import { useGetNotificationsQuery, useReadNotificationMutation } from "../../api/notification.api";
import useSelector from "../../hooks/useSelector";
import useDispatch from "../../hooks/useDispatch";

// Icons
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// Types
import { NotificationItem as NotificationItemType, NotificationTypeFilter } from "../../interfaces";
import { Alert, CircularProgress, SelectChangeEvent } from "@mui/material";

// Actions
import { setNotReadNotificationCount } from "../../store/slices/globalSlice";

// Icons
import DoneAllIcon from "@mui/icons-material/DoneAll";

// Utils
import { formatDateStandardWithTime } from "../../utils/formatDate";

// Components
import { ListItemAvatar, Divider, Typography, Stack, Box } from "@mui/material";
import Button from "../Button/Button";
import SelectInput from "../SelectInput/SelectInput";
import StatusBadge from "../StatusBadge/StatusBadge";
import FallbackContainer from "../FallbackContainer/FallbackContainer";
import BoxButton from "../BoxButton/BoxButton";

interface NotificationDrawerProps {
	open: boolean;
	onClose: () => void;
}

const NotificationDrawer = ({ open, onClose }: NotificationDrawerProps) => {
	const dispatch = useDispatch();
	const isAuth = useSelector(state => state.auth.isAuth);
	const router = useRouter();
	const [currentPage, setCurrentPage] = useState(0);
	const [page, setPage] = useState(1);
	const [notifications, setNotifications] = useState<NotificationItemType[]>([]);
	const [categoryFilter, setCategoryFilter] = useState<NotificationTypeFilter>("default");

	const categoryFilterChangeHandler = (e: SelectChangeEvent<unknown>) => {
		setCategoryFilter(e.target.value as NotificationTypeFilter);
	};

	useEffect(() => {
		setNotifications([]);
		setCurrentPage(0);
		setPage(1);
	}, [categoryFilter]);

	const pageChangeHandler = (page: number) => {
		setPage(page);
	};

	const {
		data: notificationsData,
		isLoading: isGetNotificationsLoading,
		isFetching: isGetNotificationsFetching,
		isSuccess: isGetNotificationsSuccess,
		error: getNotificationsError,
		refetch: refetchNotifications
	} = useGetNotificationsQuery(
		{ page, type: categoryFilter },
		{
			skip: !isAuth
		}
	);
	const notificationsError: any = getNotificationsError;
	const noDataFound = notifications?.length === 0;

	useEffect(() => {
		if (notificationsData && isGetNotificationsSuccess && !isGetNotificationsFetching) {
			if (currentPage < notificationsData.page) {
				setNotifications((prev): NotificationItemType[] => [
					...prev,
					...notificationsData.data.notifications
				]);
				setCurrentPage(notificationsData.page);
			}

			dispatch(setNotReadNotificationCount(notificationsData.data.notRead));
		}
	}, [
		isGetNotificationsSuccess,
		notificationsData,
		currentPage,
		isGetNotificationsFetching,
		dispatch
	]);

	const [readNotification, { reset: resetReadNotification }] = useReadNotificationMutation();

	const readNotificationHandler = async (notificationId: string) => {
		const res = await readNotification(notificationId).unwrap();

		if (res.status === "success") {
			setNotifications(prev =>
				prev.map(item =>
					item.id === res.data.readNotificationId ? { ...item, is_read: true } : item
				)
			);
			dispatch(setNotReadNotificationCount(res.data.notRead));
			resetReadNotification();
		}
	};

	return (
		<NotificationDrawerContainer open={open} onClose={onClose} anchor="right" keepMounted>
			<HideNotificationButton variant="text" endIcon={<ChevronRightIcon />} onClick={onClose}>
				Close Notifications
			</HideNotificationButton>
			<Box sx={{ my: 1 }}>
				<SelectInput
					options={[
						{ label: "Show all", value: "default" },
						{ label: "Transaction", value: "transaction" },
						{ label: "Marketing", value: "marketing" },
						{ label: "Message", value: "message" },
						{ label: "System", value: "system" }
					]}
					onChange={categoryFilterChangeHandler}
					value={categoryFilter}
					size="small"
				/>
			</Box>
			<NotificationLists>
				{!isGetNotificationsLoading && getNotificationsError && (
					<FallbackContainer>
						<Alert severity="error">{notificationsError?.data?.message}</Alert>
						<BoxButton onClick={refetchNotifications}>Try again</BoxButton>
					</FallbackContainer>
				)}
				{isGetNotificationsLoading && (
					<FallbackContainer>
						<CircularProgress />
					</FallbackContainer>
				)}
				{!isGetNotificationsLoading && isGetNotificationsSuccess && noDataFound && (
					<FallbackContainer>
						<Alert severity="info">No notification found!</Alert>
					</FallbackContainer>
				)}
				{!noDataFound &&
					notifications.map(item => (
						<React.Fragment key={item.id}>
							<NotificationItem
								onClick={async () => {
									if (item.action_link) {
										onClose();
										readNotificationHandler(item.id.toString());
										const redirectUrl = item.action_link.replace("http://localhost:3001", "");
										await router.push(redirectUrl);
									}
								}}
							>
								<ListItemAvatar sx={{ mr: { xs: "0rem", sm: "1.5rem", lg: "2rem" } }}>
									<NotificationItemImage
										alt={item.title}
										src="/images/logo-square.jpg"
										sx={{ border: "1px solid #999" }}
										variant="rounded"
									/>
								</ListItemAvatar>
								<NotificationItemContent
									primaryTypographyProps={{
										fontWeight: item.is_read ? `400 !important` : `600 !important`
									}}
									secondaryTypographyProps={{ component: "div" }}
									primary={item.title}
									secondary={
										<>
											<Typography
												sx={{
													display: "inline",
													fontSize: {
														xs: "1.4rem",
														sm: "1.5rem"
													}
												}}
												component="span"
												variant="body2"
												color="text.primary"
											>
												{item.description}
											</Typography>
											<Stack direction="row" justifyContent="space-between" sx={{ mt: 0.5 }}>
												<Stack direction="row" gap={1}>
													<StatusBadge
														color={
															item.category_name === "transaction"
																? "primary"
																: item.category_name === "marketing"
																? "info"
																: item.category_name === "system"
																? "warning"
																: "secondary"
														}
													>
														{item.category_name + ""}
													</StatusBadge>
													{item.is_read && <DoneAllIcon color="disabled" />}
												</Stack>
												<>{formatDateStandardWithTime(item.created_at)}</>
											</Stack>
										</>
									}
								/>
							</NotificationItem>
							<Divider variant="fullWidth" component="li" sx={{ mb: "1rem" }} />
						</React.Fragment>
					))}
			</NotificationLists>
			{isGetNotificationsFetching && notifications.length > 0 && (
				<FallbackContainer size="small">
					<CircularProgress />
				</FallbackContainer>
			)}
			{notificationsData && page < notificationsData.totalPages && (
				<NotificationActionButtons>
					<Button
						color="primary"
						size="small"
						onClick={() => pageChangeHandler(page + 1)}
						loading={isGetNotificationsLoading}
					>
						Load More
					</Button>
				</NotificationActionButtons>
			)}
		</NotificationDrawerContainer>
	);
};

export default NotificationDrawer;
