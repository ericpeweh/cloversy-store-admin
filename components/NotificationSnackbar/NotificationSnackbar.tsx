// Dependencies
import React from "react";

// Styles
import {
	CardComponent,
	CardWrapper,
	CardImage,
	CustomSnackbar,
	CardImageContainer,
	Title,
	NotificationText
} from "./NotificationSnackbar.styles";

// Types
import { NotificationDataType } from "../../parts/NotificationLayer/NotificiationLayer";

// Icons
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

// Hooks
import { useRouter } from "next/router";

// Components
import { Stack } from "@mui/material";
import Button from "../Button/Button";

interface NotificationSnackbarProps {
	data: NotificationDataType | null;
	onClose: () => void;
}

const NotificationSnackbar = ({ data, onClose }: NotificationSnackbarProps) => {
	const router = useRouter();

	const closeSnackbarHandler = (_?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === "clickaway") return;
		onClose();
	};

	const actionClickHandler = () => {
		if (data?.actionLink) {
			router.push(data.actionLink);
			onClose();
		}
	};

	return (
		<CustomSnackbar
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			open={true}
			onClose={closeSnackbarHandler}
			key={"notification_info"}
			sx={{ zIndex: 2000 }}
		>
			<CardComponent>
				<CardWrapper>
					<Title>
						<NotificationsNoneOutlinedIcon />
						{data?.title}
					</Title>
					<Stack direction="row" gap={2}>
						<CardImageContainer>
							<CardImage component="img" image={data?.imageUrl || "/images/logo-square.jpg"} />
						</CardImageContainer>
						<NotificationText>{data?.message}</NotificationText>
					</Stack>
					<Stack direction="row" gap={1.5} mt={1.5}>
						<Button size="small" fullWidth onClick={closeSnackbarHandler}>
							Tutup
						</Button>
						{data?.actionLink && (
							<Button size="small" fullWidth color="primary" onClick={actionClickHandler}>
								{data?.actionTitle || "Detail"}
							</Button>
						)}
					</Stack>
				</CardWrapper>
			</CardComponent>
		</CustomSnackbar>
	);
};

export default NotificationSnackbar;
