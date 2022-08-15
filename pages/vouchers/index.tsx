// Dependencies
import type { NextPage } from "next";
import Head from "next/head";

// Components
import MainWrapper from "../../components/MainWrapper/MainWrapper";
import Vouchers from "../../parts/Vouchers/Vouchers";

const VouchersPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Vouchers | Cloversy Web Admin</title>
				<meta name="description" content="Customize your shoes, be special!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<MainWrapper>
				<Vouchers />
			</MainWrapper>
		</>
	);
};

export default VouchersPage;
