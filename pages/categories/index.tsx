// Dependencies
import type { NextPage } from "next";
import Head from "next/head";

// Components
import MainWrapper from "../../components/MainWrapper/MainWrapper";
import Categories from "../../parts/Categories/Categories";

const CategoriesPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Categories | Cloversy Web Admin</title>
				<meta name="description" content="Customize your shoes, be special!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<MainWrapper>
				<Categories />
			</MainWrapper>
		</>
	);
};

export default CategoriesPage;
