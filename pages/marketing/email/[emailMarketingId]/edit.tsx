// Dependencies
import type { NextPage } from "next";
import Head from "next/head";

// Components
import MainWrapper from "../../../../components/MainWrapper/MainWrapper";
import EditEmailMarketing from "../../../../parts/EditEmailMarketing/EditEmailMarketing";

const EditEmailMarketingPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Edit Email Marketing | Cloversy Web Admin</title>
				<meta name="description" content="Customize your shoes, be special!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<MainWrapper>
				<EditEmailMarketing />
			</MainWrapper>
		</>
	);
};

export default EditEmailMarketingPage;
