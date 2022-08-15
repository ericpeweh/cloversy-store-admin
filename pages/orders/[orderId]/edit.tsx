// Dependencies
import type { NextPage } from "next";
import Head from "next/head";

// Components
import MainWrapper from "../../../components/MainWrapper/MainWrapper";
import EditOrder from "../../../parts/EditOrder/EditOrder";

const EditOrderPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Edit Order | Cloversy Web Admin</title>
				<meta name="description" content="Customize your shoes, be special!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<MainWrapper>
				<EditOrder />
			</MainWrapper>
		</>
	);
};

export default EditOrderPage;
