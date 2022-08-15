// Dependencies
import type { NextPage } from "next";
import Head from "next/head";

// Components
import MainWrapper from "../../components/MainWrapper/MainWrapper";
import AddProduct from "../../parts/AddProduct/AddProduct";

const AddProductPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Add Product | Cloversy Web Admin</title>
				<meta name="description" content="Customize your shoes, be special!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<MainWrapper>
				<AddProduct />
			</MainWrapper>
		</>
	);
};

export default AddProductPage;
