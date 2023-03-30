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

// Hooks
import { useRouter } from "next/router";

// Types
import { Customer } from "../../interfaces";

// Components
import BoxButton from "../BoxButton/BoxButton";
import StatusBadge from "../StatusBadge/StatusBadge";

interface CustomerListItemProps {
	customerData: Customer;
}

const CustomerListCard = ({ customerData }: CustomerListItemProps) => {
	const router = useRouter();

	return (
		<CustomerListCardContainer>
			<StatusContainer>
				<StatusBadge color={customerData.user_status === "banned" ? "error" : "primary"}>
					{customerData.user_status}
				</StatusBadge>
			</StatusContainer>
			<CustomerImageContainer>
				<CustomerImage imageUrl={customerData.profile_picture} />
			</CustomerImageContainer>
			<CustomerContent>
				<CustomerTitle>{customerData.full_name}</CustomerTitle>
				<CustomerText>{customerData.email}</CustomerText>
				<BoxButton onClick={() => router.push(`customers/${customerData.id}`)}>
					View profile
				</BoxButton>
			</CustomerContent>
		</CustomerListCardContainer>
	);
};

export default CustomerListCard;
