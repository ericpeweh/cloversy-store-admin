// Dependencies
import React from "react";
import Head from "next/head";
import { NextPage } from "next";

// Components
import MainWrapper from "../components/MainWrapper/MainWrapper";
import NotFound from "../parts/NotFound/NotFound";

const NotFoundPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>404 - Halaman Tidak Ditemukan</title>
				<meta name="description" content="Cloversy Store - Admin Page" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<MainWrapper>
				<NotFound />
			</MainWrapper>
		</>
	);
};

export default NotFoundPage;
