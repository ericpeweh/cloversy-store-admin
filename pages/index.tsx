// Dependencies
import type { NextPage } from "next";
import Head from "next/head";

// Components
import MainWrapper from "../components/MainWrapper/MainWrapper";
import Dashboard from "../parts/Dashboard/Dashboard";

const DashboardPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Cloversy Web Admin</title>
				<meta name="description" content="Customize your shoes, be special!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<MainWrapper>
				<Dashboard />
			</MainWrapper>
		</>
	);
};

export default DashboardPage;
