// Dependencies
import React from "react";
import Head from "next/head";

// Styles
import { ContentContainer, CustomerDetailsContainer } from "./CustomerDetails.styles";

// Hooks
import { useGetCustomerDetailQuery } from "../../api/customer.api";
import { useRouter } from "next/router";
import useSelector from "../../hooks/useSelector";

// Components
import { Grid, CircularProgress, Alert } from "@mui/material";
import BoxButton from "../../components/BoxButton/BoxButton";
import FallbackContainer from "../../components/FallbackContainer/FallbackContainer";

// Parts
import DetailsHeader from "./DetailsHeader/DetailsHeader";
import AccountInformation from "./AccountInformation/AccountInformation";
import SavedAddress from "./SavedAddress/SavedAddress";
import UserActivity from "./UserActivity/UserActivity";
import OwnedVouchers from "./OwnedVouchers/OwnedVouchers";
import TransactionsHistory from "./TransactionsHistory/TransactionsHistory";

const CustomerDetails = () => {
	const isAuth = useSelector(state => state.auth.isAuth);
	const router = useRouter();
	const { customerId } = router.query;

	const {
		data: getCustomerData,
		isLoading: isGetCustomerLoading,
		isSuccess: isGetCustomerSuccess,
		error: getCustomerError,
		refetch: refetchCustomer
	} = useGetCustomerDetailQuery(customerId, {
		skip: !isAuth || !customerId
	});
	const customerError: any = getCustomerError;
	const customerData = getCustomerData?.data.customer;

	return (
		<>
			<Head>
				<title>Customer Details | {customerData?.full_name || "Loading..."}</title>
			</Head>
			<CustomerDetailsContainer>
				{!isGetCustomerLoading && getCustomerError && (
					<FallbackContainer>
						<Alert severity="error">{customerError.data.message}</Alert>
						<BoxButton onClick={refetchCustomer}>Try again</BoxButton>
					</FallbackContainer>
				)}
				{isGetCustomerLoading && (
					<FallbackContainer>
						<CircularProgress />
					</FallbackContainer>
				)}
				{isGetCustomerSuccess && customerData && (
					<>
						<DetailsHeader customerData={customerData} />
						<ContentContainer>
							<Grid container spacing={3}>
								<Grid item xs={12} md={6}>
									<AccountInformation customerData={customerData} />
									<SavedAddress customerData={customerData} />
								</Grid>
								<Grid item xs={12} md={6}>
									<UserActivity customerData={customerData} />
									<OwnedVouchers customerData={customerData} />
								</Grid>
							</Grid>
						</ContentContainer>
						<ContentContainer>
							<TransactionsHistory customerData={customerData} />
						</ContentContainer>
					</>
				)}
			</CustomerDetailsContainer>
		</>
	);
};

export default CustomerDetails;
