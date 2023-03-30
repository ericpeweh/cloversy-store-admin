// Dependencies
import React, { useState } from "react";

// Styles
import {
	CustomerImage,
	DetailDescription,
	DetailItem,
	DetailsContainer,
	DetailTitle
} from "./AccountInformation.styles";
import { Section, SectionTitle } from "../CustomerDetails.styles";

// utils
import { formatDateFull } from "../../../utils/formatDate";

// Types
import { Customer } from "../../../interfaces";

// Icons
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

// Components
import { IconButton, Snackbar, Stack } from "@mui/material";
import StatusBadge from "../../../components/StatusBadge/StatusBadge";

interface AccountInformationProps {
	customerData: Customer;
}

const AccountInformation = ({ customerData }: AccountInformationProps) => {
	const [successCopyEmail, setSuccessCopyEmail] = useState(false);
	const [successCopyContact, setSuccessCopyContact] = useState(false);

	const copyCustomerEmailHandler = async () => {
		if (customerData?.email) {
			await navigator.clipboard.writeText(customerData?.email);
			setSuccessCopyEmail(true);
		}
	};

	const copyCustomerContactHandler = async () => {
		if (customerData?.contact) {
			await navigator.clipboard.writeText(customerData?.contact);
			setSuccessCopyContact(true);
		}
	};

	return (
		<Section>
			<Snackbar
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				open={successCopyEmail}
				onClose={() => setSuccessCopyEmail(false)}
				message="Customer email copied!"
				key={"customer_email_copy"}
				autoHideDuration={1500}
			/>
			<Snackbar
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				open={successCopyContact}
				onClose={() => setSuccessCopyContact(false)}
				message="Customer contact copied!"
				key={"customer_contact_copy"}
				autoHideDuration={1500}
			/>
			<DetailsContainer>
				<SectionTitle>Account Information</SectionTitle>
				<DetailItem>
					<DetailTitle>Full name</DetailTitle>
					<DetailDescription>
						<Stack direction="row" alignItems="center" gap={1}>
							<CustomerImage imageUrl={customerData.profile_picture} />
							{customerData.full_name}
						</Stack>
					</DetailDescription>
				</DetailItem>
				<DetailItem>
					<DetailTitle>Email</DetailTitle>
					<Stack direction="row" alignItems="center" gap={1}>
						<DetailDescription>{customerData.email}</DetailDescription>
						<IconButton size="small" onClick={copyCustomerEmailHandler}>
							<ContentCopyIcon fontSize="small" />
						</IconButton>
					</Stack>
				</DetailItem>
				<DetailItem>
					<DetailTitle>Contact</DetailTitle>
					<Stack direction="row" alignItems="center" gap={1}>
						<DetailDescription>
							{customerData.contact ? customerData.contact : "No contact provided"}
						</DetailDescription>
						{customerData.contact && (
							<IconButton size="small" onClick={copyCustomerContactHandler}>
								<ContentCopyIcon fontSize="small" />
							</IconButton>
						)}
					</Stack>
				</DetailItem>
				<DetailItem>
					<DetailTitle>User status</DetailTitle>
					<DetailDescription>
						<Stack
							justifyContent="flex-start"
							direction={{ xs: "column", sm: "row", md: "column", xl: "row" }}
							gap={1}
						>
							<StatusBadge color={customerData.user_status === "active" ? "primary" : "error"}>
								{customerData.user_status}
							</StatusBadge>
							<p>
								| {customerData.user_status === "banned" ? "Banned" : "Joined"}:{" "}
								{customerData.user_status === "banned"
									? formatDateFull(customerData.banned_date)
									: formatDateFull(customerData.created_at)}
							</p>
						</Stack>
					</DetailDescription>
				</DetailItem>
				<DetailItem>
					<DetailTitle>Clover Credits</DetailTitle>
					<Stack direction="row" alignItems="center" gap={1}>
						<DetailDescription>{customerData.credits}</DetailDescription>
					</Stack>
				</DetailItem>
			</DetailsContainer>
		</Section>
	);
};

export default AccountInformation;
