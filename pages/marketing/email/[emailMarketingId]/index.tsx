// Dependencies
import type { NextPage } from "next";
import Head from "next/head";

// Components
import MainWrapper from "../../../../components/MainWrapper/MainWrapper";
import EmailMarketingDetails from "../../../../parts/EmailMarketingDetails/EmailMarketingDetails";

const EmailMarketingDetailsPage: NextPage = () => {
	return (
		<>
			<Head>
				<meta name="description" content="Customize your shoes, be special!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<MainWrapper>
				<EmailMarketingDetails />
			</MainWrapper>
		</>
	);
};

export default EmailMarketingDetailsPage;
