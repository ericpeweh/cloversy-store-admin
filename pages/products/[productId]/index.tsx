// Dependencies
import type { NextPage } from "next";
import Head from "next/head";

// Components
import MainWrapper from "../../../components/MainWrapper/MainWrapper";
import ProductDetails from "../../../parts/ProductDetails/ProductDetails";

const ProductDetailsPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Product Details | Product Name Goes Here</title>
				<meta name="description" content="Customize your shoes, be special!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<MainWrapper>
				<ProductDetails />
			</MainWrapper>
		</>
	);
};

export default ProductDetailsPage;
