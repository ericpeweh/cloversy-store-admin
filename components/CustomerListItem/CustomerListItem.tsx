// Dependencies
import React from "react";

// Styles
import {
	CustomerImage,
	CustomerListItemContainer,
	CustomerText,
	CustomerTitle
} from "./CustomerListItem.styles";

// Icons
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

// Dependencies
import { Grid, Stack } from "@mui/material";
import Image from "next/image";
import StatusBadge from "../StatusBadge/StatusBadge";
import BoxButton from "../BoxButton/BoxButton";

interface ProdListItemProps {
	onMoreButtonClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const CustomerListItem = ({ onMoreButtonClick }: ProdListItemProps) => {
	return (
		<CustomerListItemContainer container alignItems="center">
			<Grid item xs={3}>
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
			<Grid item xs={3}>
				<CustomerText>mikicicimol88@gmail.com</CustomerText>
			</Grid>
			<Grid item xs={2}>
				<Stack justifyContent="flex-end">
					<CustomerText>
						<StatusBadge>Active</StatusBadge>
					</CustomerText>
				</Stack>
			</Grid>
			<Grid item xs={2}>
				<CustomerText>05/08/2022</CustomerText>
			</Grid>
			<Grid item xs={2}>
				<Stack justifyContent="flex-end" direction="row" gap={1}>
					<BoxButton>Detail customer</BoxButton>
					<BoxButton onClick={onMoreButtonClick}>
						<MoreHorizIcon fontSize="small" />
					</BoxButton>
				</Stack>
			</Grid>
		</CustomerListItemContainer>
	);
};

export default CustomerListItem;
