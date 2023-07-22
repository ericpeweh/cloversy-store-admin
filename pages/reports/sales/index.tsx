// Dependencies
import type { NextPage } from "next";
import Head from "next/head";

// Components
import MainWrapper from "../../../components/MainWrapper/MainWrapper";

// Parts
import SalesReport from "../../../parts/SalesReport/SalesReport";

const VouchersPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Sales Report | Cloversy Web Admin</title>
				<meta name="description" content="Customize your shoes, be special!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<MainWrapper>
				<SalesReport />
			</MainWrapper>
		</>
	);
};

export default VouchersPage;
