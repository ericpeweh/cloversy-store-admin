// Dependencies
import React from "react";
import { useRouter } from "next/router";
import { purple } from "@mui/material/colors";

// Styles
import {
	ContentContainer,
	DetailDescription,
	DetailItem,
	DetailsContainer,
	DetailTitle,
	VoucherDetailsContainer
} from "./VoucherDetails.styles";

// Icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

// Hooks
import useModal from "../../hooks/useModal";

// Components
import { Chip, Grid, IconButton, Stack } from "@mui/material";
import PageTitle from "../../components/PageTitle/PageTitle";
import Button from "../../components/Button/Button";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import AreaChart from "../../components/AreaChart/AreaChart";

// Chart data
const data = [
	{
		name: "Jan",
		usage: 15
	},
	{
		name: "Feb",
		usage: 30
	},
	{
		name: "Mar",
		usage: 4
	},
	{
		name: "Apr",
		usage: 4
	},
	{
		name: "May",
		usage: 40
	},
	{
		name: "Jun",
		usage: 8
	},
	{
		name: "Jul",
		usage: 15
	},
	{
		name: "Aug",
		usage: 15
	},
	{
		name: "Sep",
		usage: 15
	},
	{
		name: "Okt",
		usage: 4
	},
	{
		name: "Nov",
		usage: 15
	},
	{
		name: "Dec",
		usage: 32
	}
];

const VoucherDetails = () => {
	const router = useRouter();

	const {
		isOpen: isDeleteVoucherModalOpen,
		openHandler: openDeleteVoucherModalHandler,
		closeHandler: closeDeleteVoucherModalHandler
	} = useModal();

	return (
		<VoucherDetailsContainer>
			<ConfirmationModal
				modalTitle="Delete Voucher"
				modalDescription="Are you sure you want to delete <Voucher name>, this action can't be undone."
				onClose={closeDeleteVoucherModalHandler}
				open={isDeleteVoucherModalOpen}
				confirmText="Delete"
				confirmColor="error"
				cancelText="Cancel"
				cancelColor="secondary"
			/>
			<Stack direction="row" alignItems="center" justifyContent="space-between">
				<PageTitle sx={{ mb: 0 }}>Voucher Details</PageTitle>
				<Stack direction="row" alignItems="center" gap={1}>
					<Button
						startIcon={<EditIcon />}
						size="small"
						color="secondary"
						variant="outlined"
						onClick={() => router.push("/vouchers/abc/edit")}
					>
						Edit Voucher
					</Button>
					<Button
						startIcon={<DeleteIcon />}
						size="small"
						color="error"
						onClick={openDeleteVoucherModalHandler}
					>
						Delete
					</Button>
				</Stack>
			</Stack>
			<ContentContainer>
				<Grid container spacing={{ xs: 1, md: 2, lg: 3 }}>
					<Grid item xs={12} xl={6}>
						<DetailsContainer>
							<DetailItem>
								<DetailTitle>Voucher Title</DetailTitle>
								<DetailDescription>Diskon Rp 25.000</DetailDescription>
							</DetailItem>
							<DetailItem>
								<DetailTitle>Code</DetailTitle>
								<Stack direction="row" alignItems="center" gap={1}>
									<DetailDescription>ACBD98DC88</DetailDescription>
									<IconButton size="small">
										<ContentCopyIcon fontSize="small" />
									</IconButton>
								</Stack>
							</DetailItem>
							<DetailItem>
								<DetailTitle>Expiry Date</DetailTitle>
								<DetailDescription>03/08/2022</DetailDescription>
							</DetailItem>
							<DetailItem>
								<DetailTitle>Discount</DetailTitle>
								<DetailDescription>- Rp 25.000</DetailDescription>
							</DetailItem>
							<DetailItem>
								<DetailTitle>Status</DetailTitle>
								<DetailDescription>
									<Stack justifyContent="flex-end">
										<StatusBadge>Active</StatusBadge>
									</Stack>
								</DetailDescription>
							</DetailItem>
							<DetailItem>
								<DetailTitle>Scope</DetailTitle>
								<DetailDescription>
									<Stack justifyContent="flex-end">
										<StatusBadge color="secondary">Global</StatusBadge>
									</Stack>
								</DetailDescription>
							</DetailItem>
							<DetailItem>
								<DetailTitle>Description</DetailTitle>
								<DetailDescription>
									<p>
										Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est, dolores unde.
										Suscipit, omnis maxime. Quos doloremque hic laborum incidunt nostrum, impedit
										nulla ex aperiam ad similique. Quibusdam fuga esse illo!
									</p>
								</DetailDescription>
							</DetailItem>
						</DetailsContainer>
					</Grid>
					<Grid item xs={12} xl={6}>
						<AreaChart
							title="Statistik Penggunaan"
							data={data}
							dataKey="usage"
							fillColor={purple[100]}
							strokeColor={purple[200]}
						/>
					</Grid>
				</Grid>
			</ContentContainer>
		</VoucherDetailsContainer>
	);
};

export default VoucherDetails;
