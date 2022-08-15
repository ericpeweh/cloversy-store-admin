// Dependencies
import type { NextPage } from "next";
import Head from "next/head";

// Components
import MainWrapper from "../../../components/MainWrapper/MainWrapper";
import EditVoucher from "../../../parts/EditVoucher/EditVoucher";

const EditVoucherPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Edit Voucher | Cloversy Web Admin</title>
				<meta name="description" content="Customize your shoes, be special!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<MainWrapper>
				<EditVoucher />
			</MainWrapper>
		</>
	);
};

export default EditVoucherPage;
