// Dependencies
import type { NextPage } from "next";
import Head from "next/head";

// Components
import MainWrapper from "../../components/MainWrapper/MainWrapper";
import Products from "../../parts/Products/Products";

const ProductsPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Products | Cloversy Web Admin</title>
				<meta name="description" content="Customize your shoes, be special!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<MainWrapper>
				<Products />
			</MainWrapper>
		</>
	);
};

export default ProductsPage;
