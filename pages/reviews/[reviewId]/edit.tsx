// Dependencies
import type { NextPage } from "next";
import Head from "next/head";

// Components
import MainWrapper from "../../../components/MainWrapper/MainWrapper";
import EditReview from "../../../parts/EditReview/EditReview";

const EditReviewPage: NextPage = () => {
	return (
		<>
			<Head>
				<meta name="description" content="Customize your shoes, be special!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<MainWrapper>
				<EditReview />
			</MainWrapper>
		</>
	);
};

export default EditReviewPage;
