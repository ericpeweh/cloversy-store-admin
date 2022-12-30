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

// Hooks
import { useRouter } from "next/router";

// Utils
import { formatDateFull } from "../../../utils/formatDate";

// Types
import { Customer } from "../../../interfaces";

// Components
import { Alert, Grid, Stack } from "@mui/material";
import BoxButton from "../../../components/BoxButton/BoxButton";

interface UserActivityProps {
	customerData: Customer;
}

const UserActivity = ({ customerData }: UserActivityProps) => {
	const router = useRouter();

	return (
		<>
			{/* Last seen product */}
			<Section>
				<SectionTitle>Last Seen Product</SectionTitle>
				<Grid container spacing={1}>
					{customerData.lastSeen.length === 0 && (
						<Grid item xs={12}>
							<Alert severity="info" sx={{ width: "100%", mt: 1 }}>
								User hasn&apos;t seen any products yet
							</Alert>
						</Grid>
					)}
					{customerData.lastSeen.map(product => (
						<Grid item xs={12} key={product.id}>
							<CardItemContainer>
								<CardItemImage imageUrl={(product?.images || [])[0] || "/images/no-image.png"} />
								<Stack justifyContent="center">
									<CardTitle>{product.title}</CardTitle>
									<CardSubtitle>{formatDateFull(product.seen_date)}</CardSubtitle>
								</Stack>

								<BoxButton onClick={() => router.push(`/products/${product.id}`)}>Detail</BoxButton>
							</CardItemContainer>
						</Grid>
					))}
				</Grid>
			</Section>
			{/* Wishlist */}
			<Section>
				<SectionTitle>Wishlist</SectionTitle>
				<Grid container spacing={1}>
					{customerData.wishlist.length === 0 && (
						<Grid item xs={12}>
							<Alert severity="info" sx={{ width: "100%", mt: 1 }}>
								User&apos;s wishlist is empty.
							</Alert>
						</Grid>
					)}
					{customerData.wishlist.map(item => (
						<Grid item xs={12} key={item.id}>
							<CardItemContainer>
								<CardItemImage imageUrl={(item?.images || [])[0] || "/images/no-image.png"} />
								<Stack justifyContent="center">
									<CardTitle>{item.title}</CardTitle>
									<CardSubtitle>{formatDateFull(item.created_at)}</CardSubtitle>
								</Stack>
								<BoxButton onClick={() => router.push(`/products/${item.product_id}`)}>
									Detail
								</BoxButton>
							</CardItemContainer>
						</Grid>
					))}
				</Grid>
			</Section>
		</>
	);
};

export default UserActivity;
