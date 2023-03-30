// Dependencies
import React from "react";

// Types
import { Customer } from "../../../interfaces";

// Styles
import { Section, SectionTitle } from "../CustomerDetails.styles";
import {
	AddressContainer,
	AddressContent,
	AddressInfo,
	AddressLabel,
	AddressText,
	RecipientName
} from "./SavedAddress.styles";

// Components
import { Alert } from "@mui/material";
import StatusBadge from "../../../components/StatusBadge/StatusBadge";

interface SavedAddressProps {
	customerData: Customer;
}

const SavedAddress = ({ customerData }: SavedAddressProps) => {
	return (
		<Section>
			<SectionTitle>Saved Addresses</SectionTitle>
			{customerData.address.length === 0 && (
				<Alert severity="info" sx={{ width: "100%", mt: 2 }}>
					No saved address.
				</Alert>
			)}
			{customerData.address.map((data, i) => (
				<AddressContainer key={data.id}>
					<AddressContent>
						<AddressInfo>
							<AddressLabel>
								{data.is_default && <StatusBadge color="primary">Utama</StatusBadge>}
								{data.label}
							</AddressLabel>
							<RecipientName>{data.recipient_name}</RecipientName>
							<AddressText>{data.contact}</AddressText>
							<AddressText>
								{data.province}, {data.city}, {data.subdistrict}
							</AddressText>
							<AddressText>
								{data.address} {data.postal_code}
							</AddressText>
						</AddressInfo>
					</AddressContent>
				</AddressContainer>
			))}
		</Section>
	);
};

export default SavedAddress;
