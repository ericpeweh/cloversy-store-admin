// Dependencies
import React from "react";
import Link from "next/link";

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

// Icons
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// Components
import { ListItemAvatar, Divider, Typography, Stack } from "@mui/material";
import Button from "../Button/Button";

interface NotificationDrawerProps {
	open: boolean;
	onClose: () => void;
}

const NotificationItems = [
	{
		name: "NEW ORDER: Nike AF1 Homesick",
		desc: "No Invoice: PROD/21072022/00001 | By: mikicicimol@gmail.com",
		time: "15/08/2022 15:13"
	},
	{
		name: "NEW ORDER: Ventela Creation of Adam",
		desc: "No Invoice: PROD/21082022/00001| By: mikicicimol88@gmail.com",
		time: "14/08/2022 10:13"
	},
	{
		name: "PUSH NOTIFICATIONS SENT",
		desc: "Diskon Natal & Tahun Baru",
		time: "14/08/2022 10:13"
	}
];

const NotificationDrawer = ({ open, onClose }: NotificationDrawerProps) => {
	return (
		<NotificationDrawerContainer open={open} onClose={onClose} anchor="right">
			<HideNotificationButton variant="text" endIcon={<ChevronRightIcon />} onClick={onClose}>
				Close Notifications
			</HideNotificationButton>
			<NotificationLists>
				{[...NotificationItems, ...NotificationItems].map(item => (
					<React.Fragment key={item.name}>
						<NotificationItem key={item.name}>
							<ListItemAvatar sx={{ mr: { xs: "0rem", sm: "1.5rem", lg: "2rem" } }}>
								<Link href="#">
									<NotificationItemImage
										alt={item.name}
										src="/images/product.jpg"
										variant="rounded"
									/>
								</Link>
							</ListItemAvatar>
							<NotificationItemContent
								primary={<Link href="#">{item.name}</Link>}
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
											{item.desc}
										</Typography>
										<Stack direction="row" justifyContent="flex-end">
											{item.time}
										</Stack>
									</>
								}
							/>
						</NotificationItem>
						<Divider variant="fullWidth" component="li" sx={{ mb: "1rem" }} />
					</React.Fragment>
				))}
			</NotificationLists>
			<NotificationActionButtons>
				<Button color="primary">Load More</Button>
			</NotificationActionButtons>
		</NotificationDrawerContainer>
	);
};

export default NotificationDrawer;
