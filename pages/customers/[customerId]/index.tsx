// Dependencies
import type { NextPage } from "next";
import Head from "next/head";

// Components
import MainWrapper from "../../../components/MainWrapper/MainWrapper";
import CustomerDetails from "../../../parts/CustomerDetails/CustomerDetails";

const CustomerDetailsPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Customer Details | Customer Name Goes Here</title>
				<meta name="description" content="Customize your shoes, be special!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<MainWrapper>
				<CustomerDetails />
			</MainWrapper>
		</>
	);
};

export default CustomerDetailsPage;
