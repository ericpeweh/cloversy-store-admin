// Dependencies
import React from "react";

// Styles
import {
	CustomerImage,
	CustomerListItemContainer,
	CustomerText,
	CustomerTitle
} from "./CustomerListItem.styles";

// Dependencies
import { Grid, Stack } from "@mui/material";
import Image from "next/image";
import StatusBadge from "../StatusBadge/StatusBadge";
import BoxButton from "../BoxButton/BoxButton";

// Hooks
import useWindowSize from "../../hooks/useWindowSize";

const CustomerListItem = () => {
	const { wWidth } = useWindowSize();

	return (
		<CustomerListItemContainer container alignItems="center" rowSpacing={1}>
			<Grid item xs={wWidth <= 600 ? 6 : wWidth <= 900 ? 4 : 3}>
				<Stack direction="row" gap={1} alignItems="center">
					<CustomerImage>
						<Image
							src="/images/1.jpg"
							alt="Customer"
							layout="responsive"
							width={1080}
							height={1080}
						/>
					</CustomerImage>
					<CustomerTitle>Mikici Cimol</CustomerTitle>
				</Stack>
			</Grid>
			<Grid item xs={wWidth <= 600 ? 6 : wWidth <= 900 ? 4 : 3}>
				<CustomerText>mikicicimol88@gmail.com</CustomerText>
			</Grid>
			<Grid item xs={wWidth < 600 ? 4 : 2}>
				<Stack justifyContent="flex-end">
					<CustomerText>
						<StatusBadge>Active</StatusBadge>
					</CustomerText>
				</Stack>
			</Grid>
			{(wWidth < 600 || wWidth > 900) && (
				<Grid item xs={wWidth < 600 ? 4 : 2}>
					<CustomerText
						sx={{
							"@media screen and (max-width: 700px)": {
								margin: "auto"
							}
						}}
					>
						Joined: 05/08/2022
					</CustomerText>
				</Grid>
			)}
			<Grid item xs={wWidth < 600 ? 4 : 2}>
				<Stack justifyContent="flex-end" direction="row" gap={1}>
					<BoxButton>Detail</BoxButton>
				</Stack>
			</Grid>
		</CustomerListItemContainer>
	);
};

export default CustomerListItem;
