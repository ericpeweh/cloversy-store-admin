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
