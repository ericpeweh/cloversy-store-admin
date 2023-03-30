// Dependencies
import React from "react";
import { useRouter } from "next/router";

// Styles
import {
	CustomerImage,
	CustomerListItemContainer,
	CustomerText,
	CustomerTitle
} from "./CustomerListItem.styles";

// Utils
import { formatDateStandard } from "../../utils/formatDate";

// Components
import { Avatar, Grid, Stack } from "@mui/material";
import StatusBadge from "../StatusBadge/StatusBadge";
import BoxButton from "../BoxButton/BoxButton";

// Types
import { Customer } from "../../interfaces";

// Hooks
import useWindowSize from "../../hooks/useWindowSize";

interface CustomerListItemProps {
	customerData: Customer;
}

const CustomerListItem = ({ customerData }: CustomerListItemProps) => {
	const { wWidth } = useWindowSize();
	const router = useRouter();

	return (
		<CustomerListItemContainer container alignItems="center" rowSpacing={1}>
			<Grid item xs={wWidth <= 600 ? 12 : wWidth <= 900 ? 6 : 5}>
				<Stack direction="row" gap={1} alignItems="center">
					<CustomerImage>
						<Avatar
							src={customerData.profile_picture}
							alt="user profile"
							sx={{
								width: "6rem",
								height: "6rem"
							}}
							imgProps={{ referrerPolicy: "no-referrer" }}
						/>
					</CustomerImage>
					<CustomerTitle onClick={() => router.push(`customers/${customerData.id}`)}>
						{customerData.full_name}
					</CustomerTitle>
				</Stack>
			</Grid>
			<Grid item xs={wWidth <= 600 ? 5 : wWidth <= 900 ? 4 : 3}>
				<CustomerText>{customerData.email}</CustomerText>
			</Grid>
			<Grid item xs={wWidth < 600 ? 2 : 2}>
				<Stack justifyContent="flex-end">
					<CustomerText>
						<StatusBadge color={customerData.user_status === "banned" ? "error" : "primary"}>
							{customerData.user_status}
						</StatusBadge>
					</CustomerText>
				</Stack>
			</Grid>
			{(wWidth < 600 || wWidth > 900) && (
				<Grid item xs={wWidth < 600 ? 5 : 2}>
					<CustomerText
						sx={{
							"@media screen and (max-width: 700px)": {
								margin: "auto"
							}
						}}
					>
						Joined: {formatDateStandard(customerData.created_at)}
					</CustomerText>
				</Grid>
			)}
		</CustomerListItemContainer>
	);
};

export default CustomerListItem;
