// Dependencies
import type { NextPage } from "next";
import Head from "next/head";

// Components
import MainWrapper from "../../../components/MainWrapper/MainWrapper";
import OrderDetails from "../../../parts/OrderDetails/OrderDetails";

const OrderDetailsPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Order Details | Order Number Goes Here</title>
				<meta name="description" content="Customize your shoes, be special!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<MainWrapper>
				<OrderDetails />
			</MainWrapper>
		</>
	);
};

export default OrderDetailsPage;
