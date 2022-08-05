// Dependencies
import React from "react";

// Icons
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

// Styles
import {
	CustomerListCardContainer,
	CustomerImage,
	CustomerText,
	CustomerTitle,
	StatusContainer,
	CustomerImageContainer,
	CustomerContent
} from "./CustomerListCard.styles";

// Components
import BoxButton from "../BoxButton/BoxButton";
import StatusBadge from "../StatusBadge/StatusBadge";

const CustomerListCard = () => {
	return (
		<CustomerListCardContainer>
			<StatusContainer>
				<StatusBadge>Active</StatusBadge>
			</StatusContainer>
			<CustomerImageContainer>
				<CustomerImage imageUrl="/images/1.jpg" />
			</CustomerImageContainer>
			<CustomerContent>
				<CustomerTitle>Mikici Cimol</CustomerTitle>
				<CustomerText>mikicicimol88@gmail.com</CustomerText>
				<BoxButton>View profile</BoxButton>
			</CustomerContent>
		</CustomerListCardContainer>
	);
};

export default CustomerListCard;
