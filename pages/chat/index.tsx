// Dependencies
import type { NextPage } from "next";
import Head from "next/head";

// Components
import MainWrapper from "../../components/MainWrapper/MainWrapper";
import Chatting from "../../parts/Chatting/Chatting";

const ChattingPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Chatting | Cloversy Web Admin</title>
				<meta name="description" content="Customize your shoes, be special!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<MainWrapper>
				<Chatting />
			</MainWrapper>
		</>
	);
};

export default ChattingPage;
