// Dependencies
import type { NextPage } from "next";
import Head from "next/head";

// Components
import MainWrapper from "../../components/MainWrapper/MainWrapper";
import Customers from "../../parts/Customers/Customers";

const CustomersPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Customers | Cloversy Web Admin</title>
				<meta name="description" content="Customize your shoes, be special!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<MainWrapper>
				<Customers />
			</MainWrapper>
		</>
	);
};

export default CustomersPage;
