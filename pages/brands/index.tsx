// Dependencies
import type { NextPage } from "next";
import Head from "next/head";

// Components
import MainWrapper from "../../components/MainWrapper/MainWrapper";
import Brands from "../../parts/Brands/Brands";

const BrandsPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Brands | Cloversy Web Admin</title>
				<meta name="description" content="Customize your shoes, be special!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<MainWrapper>
				<Brands />
			</MainWrapper>
		</>
	);
};

export default BrandsPage;
