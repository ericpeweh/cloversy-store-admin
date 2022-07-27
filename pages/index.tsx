// Dependencies
import type { NextPage } from "next";
import Head from "next/head";

// Components
import MainWrapper from "../components/MainWrapper/MainWrapper";

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Cloversy Web Admin</title>
				<meta name="description" content="Customize your shoes, be special!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<MainWrapper>
				<h1>TEST</h1>
			</MainWrapper>
		</>
	);
};

export default Home;
