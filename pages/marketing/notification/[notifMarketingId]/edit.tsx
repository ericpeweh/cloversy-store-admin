// Dependencies
import type { NextPage } from "next";
import Head from "next/head";

// Components
import MainWrapper from "../../../../components/MainWrapper/MainWrapper";
import EditNotification from "../../../../parts/EditNotification/EditNotification";

const EditNotificationPage: NextPage = () => {
	return (
		<>
			<Head>
				<meta name="description" content="Customize your shoes, be special!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<MainWrapper>
				<EditNotification />
			</MainWrapper>
		</>
	);
};

export default EditNotificationPage;
