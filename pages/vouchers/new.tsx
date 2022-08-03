// Dependencies
import type { NextPage } from "next";
import Head from "next/head";

// Components
import MainWrapper from "../../components/MainWrapper/MainWrapper";
import AddVoucher from "../../parts/AddVoucher/AddVoucher";

const AddVoucherPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Add Voucher | Cloversy Web Admin</title>
				<meta name="description" content="Customize your shoes, be special!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<MainWrapper>
				<AddVoucher />
			</MainWrapper>
		</>
	);
};

export default AddVoucherPage;
