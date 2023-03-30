// Dependencies
import type { NextPage } from "next";
import Head from "next/head";

// Components
import MainWrapper from "../../../components/MainWrapper/MainWrapper";
import AddEmailMarketing from "../../../parts/AddEmailMarketing/AddEmailMarketing";

const AddEmailMarketingPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Add EmailMarketing | Cloversy Web Admin</title>
				<meta name="description" content="Customize your shoes, be special!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<MainWrapper>
				<AddEmailMarketing />
			</MainWrapper>
		</>
	);
};

export default AddEmailMarketingPage;
