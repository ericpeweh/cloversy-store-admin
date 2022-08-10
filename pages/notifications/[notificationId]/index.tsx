// Dependencies
import type { NextPage } from "next";
import Head from "next/head";

// Components
import MainWrapper from "../../../components/MainWrapper/MainWrapper";
import NotificationDetails from "../../../parts/NotificationDetails/NotificationDetails";

const NotificationDetailsPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Notification / Email Details | Notification Title Goes Here</title>
				<meta name="description" content="Customize your shoes, be special!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<MainWrapper>
				<NotificationDetails />
			</MainWrapper>
		</>
	);
};

export default NotificationDetailsPage;
