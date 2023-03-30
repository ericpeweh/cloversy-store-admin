// Dependencies
import React from "react";

// Styles
import {
	CardItemContainer,
	CardItemImage,
	CardSubtitle,
	CardTitle,
	Section,
	SectionTitle
} from "../CustomerDetails.styles";

// Utils
import { formatDateFullMonth } from "../../../utils/formatDate";

// Hooks
import { useRouter } from "next/router";

// Icons
import DiscountIcon from "@mui/icons-material/Discount";

// Types
import { Customer } from "../../../interfaces";

// Components
import { Alert, Grid, Stack } from "@mui/material";
import BoxButton from "../../../components/BoxButton/BoxButton";
import StatusBadge from "../../../components/StatusBadge/StatusBadge";

interface OwnedVouchersProps {
	customerData: Customer;
}

const OwnedVouchers = ({ customerData }: OwnedVouchersProps) => {
	return (
		<Section>
			<SectionTitle>Owned Vouchers</SectionTitle>
			<Grid container spacing={1}>
				{customerData.vouchers.length === 0 && (
					<Grid item xs={12}>
						<Alert severity="info" sx={{ width: "100%", mt: 1 }}>
							No voucher found!
						</Alert>
					</Grid>
				)}
				{customerData.vouchers.map(voucher => (
					<Grid item xs={12} key={voucher.code}>
						<CardItemContainer>
							<CardItemImage sx={{ cursor: "default" }}>
								<DiscountIcon />
							</CardItemImage>
							<Stack justifyContent="center">
								<CardTitle>{voucher.title}</CardTitle>
								<CardSubtitle>
									Berlaku hingga {formatDateFullMonth(voucher.expiry_date)}
								</CardSubtitle>
							</Stack>
							<Stack direction={{ xs: "column", sm: "row" }} sx={{ ml: "auto" }} gap={1}>
								<StatusBadge color="secondary" sx={{ alignSelf: "center", ml: { xs: 0, sm: 1 } }}>
									{voucher.code}
								</StatusBadge>
								<BoxButton>Detail</BoxButton>
							</Stack>
						</CardItemContainer>
					</Grid>
				))}
			</Grid>
		</Section>
	);
};

export default OwnedVouchers;
