// Dependencies
import type { NextPage } from "next";
import Head from "next/head";

// Components
import MainWrapper from "../../components/MainWrapper/MainWrapper";
import Orders from "../../parts/Orders/Orders";

const OrdersPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Orders | Cloversy Web Admin</title>
				<meta name="description" content="Customize your shoes, be special!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<MainWrapper>
				<Orders />
			</MainWrapper>
		</>
	);
};

export default OrdersPage;
