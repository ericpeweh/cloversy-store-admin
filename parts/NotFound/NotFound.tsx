// Dependencies
import React from "react";
import { useRouter } from "next/router";

// Styles
import { CodeText, Message, NotFoundContainer } from "./NotFound.styles";

// Icons
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Components
import Button from "../../components/Button/Button";

const NotFound = () => {
	const router = useRouter();

	const redirectToDashboardHandler = () => {
		router.replace("/");
	};

	return (
		<NotFoundContainer>
			<CodeText>404</CodeText>
			<Message>
				Halaman Tidak Ditemukan <SentimentVeryDissatisfiedIcon />
			</Message>
			<Button
				variant="outlined"
				size="small"
				startIcon={<ArrowBackIcon />}
				onClick={redirectToDashboardHandler}
			>
				Kembali ke Dashboard
			</Button>
		</NotFoundContainer>
	);
};

export default NotFound;
