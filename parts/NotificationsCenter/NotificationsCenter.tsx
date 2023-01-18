// Dependencies
import React from "react";

// Styles
import { NotificationsCenterContainer } from "./NotificationsCenter.styles";

// Icons
import AddIcon from "@mui/icons-material/Add";

// Hooks
import useMenu from "../../hooks/useMenu";
import { useRouter } from "next/router";

// Components
import { Grid, Stack } from "@mui/material";
import PageTitle from "../../components/PageTitle/PageTitle";
import Button from "../../components/Button/Button";
import Menu from "../../components/Menu/Menu";

// Parts
import NotifMarketingsList from "./NotifMarketingsList/NotifMarketingsList";
import ScheduledNotifMarketingList from "./ScheduledNotifMarketingsList/ScheduledNotifMarketingsList";
import ScheduledEmailMarketingsList from "./ScheduledEmailMarketingsList/ScheduledEmailMarketingsList";
import EmailMarketingsList from "./EmailMarketingList/EmailMarketingList";

const NotificationsCenter = () => {
	const router = useRouter();

	return (
		<NotificationsCenterContainer>
			<Stack
				direction={{ xs: "column", sm: "row" }}
				alignItems={{ xs: "flex-start", sm: "center" }}
				justifyContent="space-between"
				sx={{ mb: 2 }}
			>
				<PageTitle sx={{ mb: { xs: 1, sm: 0 } }}>Notifications Center</PageTitle>
				<Stack direction={"row"} gap={2}>
					<Button
						startIcon={<AddIcon />}
						size="small"
						color="primary"
						onClick={() => router.push("/marketing/email/new")}
					>
						Email Marketing
					</Button>
					<Button
						startIcon={<AddIcon />}
						size="small"
						color="primary"
						onClick={() => router.push("/marketing/notification/new")}
					>
						New Notification
					</Button>
				</Stack>
			</Stack>

			<Grid container spacing={3}>
				<ScheduledNotifMarketingList />
				<ScheduledEmailMarketingsList />
				<NotifMarketingsList />
				<EmailMarketingsList />
			</Grid>
		</NotificationsCenterContainer>
	);
};

export default NotificationsCenter;
