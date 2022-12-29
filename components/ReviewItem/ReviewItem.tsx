// Dependencies
import React from "react";

// Types
import { ProductReviewItem } from "../../interfaces";

// Styles
import {
	ReviewContainer,
	ReviewDate,
	ReviewDescription,
	ReviewerName,
	ReviewItemContainer
} from "./ReviewItem.styles";

// Utils
import { formatDateFull } from "../../utils/formatDate";

// Hooks
import { useRouter } from "next/router";

// Components
import {
	Avatar,
	ButtonBase,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Rating,
	Stack,
	Typography
} from "@mui/material";
import StatusBadge from "../StatusBadge/StatusBadge";

interface ReviewItemProps {
	reviewData: ProductReviewItem;
}

const ReviewItem = ({ reviewData }: ReviewItemProps) => {
	const router = useRouter();

	const openTransactionDetails = () => router.push(`/orders/${reviewData.transaction_id}`);

	return (
		<ReviewItemContainer item xs={12} md={6}>
			<ReviewContainer>
				<ListItem
					alignItems="flex-start"
					sx={{ padding: 0 }}
					secondaryAction={
						<Stack gap={{ xs: 0.5, sm: 1 }} width={"100%"} direction={{ xs: "column", sm: "row" }}>
							<ButtonBase component="span" onClick={openTransactionDetails}>
								<StatusBadge color="secondary">{reviewData.transaction_id}</StatusBadge>
							</ButtonBase>
							<StatusBadge
								color={reviewData.status === "active" ? "primary" : "error"}
								sx={{ ml: "auto" }}
							>
								{reviewData.status}
							</StatusBadge>
						</Stack>
					}
				>
					<ListItemAvatar>
						<Avatar alt="review name" src="/images/1.jpg" sx={{ width: "5rem", height: "5rem" }} />
					</ListItemAvatar>
					<ListItemText
						sx={{ ml: { xs: 0, sm: 1, lg: 2 } }}
						primary={<ReviewerName>{reviewData.full_name}</ReviewerName>}
						secondary={<ReviewDate>{formatDateFull(reviewData.created_at)}</ReviewDate>}
					/>
				</ListItem>
				<Stack direction="row" alignItems="center" gap={1} mt={2}>
					<Typography mt={0.5}>Rating: </Typography>{" "}
					<Rating value={+reviewData.rating} readOnly precision={0.1} />
					<Typography mt={0.5}>( {(+reviewData?.rating).toFixed(1)} )</Typography>
				</Stack>
				<ReviewDescription>{reviewData.description}</ReviewDescription>
			</ReviewContainer>
		</ReviewItemContainer>
	);
};

export default ReviewItem;
