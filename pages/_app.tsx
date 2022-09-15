// Dependencies
import { useEffect } from "react";
import type { AppProps } from "next/app";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { Provider as ReduxProvider } from "react-redux";
import reduxStore from "../store";
import Head from "next/head";

// Styles
import "../styles/globals.css";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// Theme
import mainTheme from "../styles/mainTheme";

// Components
import AppWrapper from "../parts/AppWrapper/AppWrapper";
import { CssBaseline } from "@mui/material";

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Head>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>
			<StyledEngineProvider injectFirst>
				<CssBaseline />
				<ThemeProvider theme={mainTheme}>
					<ReduxProvider store={reduxStore}>
						<AppWrapper>
							<Component {...pageProps} />
						</AppWrapper>
					</ReduxProvider>
				</ThemeProvider>
			</StyledEngineProvider>
		</>
	);
};

export default App;
