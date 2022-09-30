// Dependencies
import React from "react";
import { useRouter } from "next/router";

// Styles
import {
	ContentContainer,
	DetailDescription,
	DetailItem,
	DetailsContainer,
	DetailTitle,
	NotificationDetailsContainer
} from "./NotificationDetails.styles";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

// Components
import { Grid, IconButton, Stack } from "@mui/material";
import PageTitle from "../../components/PageTitle/PageTitle";
import Button from "../../components/Button/Button";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

const NotificationDetails = () => {
	const router = useRouter();

	return (
		<NotificationDetailsContainer>
			<Stack direction="row" alignItems="center" justifyContent="space-between">
				<PageTitle sx={{ mb: 0 }}>Notification Details</PageTitle>
				<Stack direction="row" alignItems="center" gap={1}>
					<Button
						startIcon={<EditIcon />}
						size="small"
						color="secondary"
						variant="outlined"
						onClick={() => router.push("/Notifications/abc/edit")}
					>
						Edit Item
					</Button>
					<Button startIcon={<ArrowBackOutlinedIcon />} size="small" color="secondary">
						Go Back
					</Button>
				</Stack>
			</Stack>
			<ContentContainer>
				<Grid container spacing={3}>
					<Grid item xs={12} md={6}>
						<DetailsContainer>
							<SectionTitle>Notification Information</SectionTitle>
							<DetailItem>
								<DetailTitle>Title</DetailTitle>
								<DetailDescription>Diskon Muriah Meria Tahun Baru</DetailDescription>
							</DetailItem>
							<DetailItem>
								<DetailTitle>Kode Notif</DetailTitle>
								<Stack direction="row" alignItems="center" gap={1}>
									<DetailDescription>ACBD98DC88</DetailDescription>
									<IconButton size="small">
										<ContentCopyIcon fontSize="small" />
									</IconButton>
								</Stack>
							</DetailItem>
							<DetailItem>
								<DetailTitle>Target</DetailTitle>
								<DetailDescription>250 Customers</DetailDescription>
							</DetailItem>
							<DetailItem>
								<DetailTitle>Type</DetailTitle>
								<DetailDescription>
									<Stack justifyContent="flex-end">
										<StatusBadge color="secondary">Push</StatusBadge>
									</Stack>
								</DetailDescription>
							</DetailItem>
							<DetailItem>
								<DetailTitle>Created</DetailTitle>
								<DetailDescription>03/08/2022 12:17 WIB</DetailDescription>
							</DetailItem>
							<DetailItem>
								<DetailTitle>Sent</DetailTitle>
								<DetailDescription>09/08/2022 10:00 WIB</DetailDescription>
							</DetailItem>
							<DetailItem>
								<DetailTitle>Description</DetailTitle>
								<DetailDescription>
									<p>
										Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est, dolores unde.
										Suscipit, omnis maxime. Quos doloremque hic laborum incidunt nostrum, impedit
									</p>
								</DetailDescription>
							</DetailItem>
						</DetailsContainer>
					</Grid>
					<Grid item xs={12} md={6}>
						<DetailsContainer>
							<SectionTitle>Message Information</SectionTitle>
							<DetailItem>
								<DetailTitle>Message Title</DetailTitle>
								<DetailDescription>
									Ayo Belanja Sekarang untuk mendapatkan diskon 20% semua produk!
								</DetailDescription>
							</DetailItem>
							<DetailItem>
								<DetailTitle>Message Body</DetailTitle>
								<DetailDescription>
									<p>
										Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est, dolores unde.
										Suscipit, omnis maxime. Quos doloremque hic laborum incidunt nostrum, impedit
									</p>
									<p>
										Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque eligendi laborum
										commodi sunt dicta asperiores nihil quia! Natus praesentium ea eius aut
										laboriosam velit beatae?
									</p>
								</DetailDescription>
							</DetailItem>
							<DetailItem>
								<DetailTitle>Action Link</DetailTitle>
								<DetailDescription>https://cloversy.id/products</DetailDescription>
							</DetailItem>
						</DetailsContainer>
					</Grid>
				</Grid>
			</ContentContainer>
		</NotificationDetailsContainer>
	);
};

export default NotificationDetails;
