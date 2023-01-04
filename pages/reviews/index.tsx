// Dependencies
import type { NextPage } from "next";
import Head from "next/head";

// Components
import MainWrapper from "../../components/MainWrapper/MainWrapper";
import Reviews from "../../parts/Reviews/Reviews";

const ReviewsPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Reviews | Cloversy Web Admin</title>
				<meta name="description" content="Customize your shoes, be special!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<MainWrapper>
				<Reviews />
			</MainWrapper>
		</>
	);
};

export default ReviewsPage;
