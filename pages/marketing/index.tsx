// Dependencies
import type { NextPage } from "next";
import Head from "next/head";

// Components
import MainWrapper from "../../components/MainWrapper/MainWrapper";
import NotificationsCenter from "../../parts/NotificationsCenter/NotificationsCenter";

const NotificationsCenterPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Notifications Center | Cloversy Web Admin</title>
				<meta name="description" content="Customize your shoes, be special!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<MainWrapper>
				<NotificationsCenter />
			</MainWrapper>
		</>
	);
};

export default NotificationsCenterPage;
