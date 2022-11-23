// Dependencies
import type { NextPage } from "next";
import Head from "next/head";

// Components
import MainWrapper from "../../../components/MainWrapper/MainWrapper";
import EditProduct from "../../../parts/EditProduct/EditProduct";

const EditProductPage: NextPage = () => {
	return (
		<>
			<Head>
				<meta name="description" content="Customize your shoes, be special!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<MainWrapper>
				<EditProduct />
			</MainWrapper>
		</>
	);
};

export default EditProductPage;
