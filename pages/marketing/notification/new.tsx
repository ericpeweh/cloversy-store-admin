// Dependencies
import type { NextPage } from "next";
import Head from "next/head";

// Components
import MainWrapper from "../../../components/MainWrapper/MainWrapper";
import AddNotification from "../../../parts/AddNotification/AddNotification";

const AddNotificationPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Add Notification | Cloversy Web Admin</title>
				<meta name="description" content="Customize your shoes, be special!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<MainWrapper>
				<AddNotification />
			</MainWrapper>
		</>
	);
};

export default AddNotificationPage;
