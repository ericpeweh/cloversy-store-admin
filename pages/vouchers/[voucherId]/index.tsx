// Dependencies
import type { NextPage } from "next";
import Head from "next/head";

// Components
import MainWrapper from "../../../components/MainWrapper/MainWrapper";
import VoucherDetails from "../../../parts/VoucherDetails/VoucherDetails";

const VoucherDetailsPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Voucher Details | Voucher Name Goes Here</title>
				<meta name="description" content="Customize your shoes, be special!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<MainWrapper>
				<VoucherDetails />
			</MainWrapper>
		</>
	);
};

export default VoucherDetailsPage;
