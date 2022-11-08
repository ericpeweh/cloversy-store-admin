// Dependencies
import type { AppProps } from "next/app";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { Provider as ReduxProvider } from "react-redux";
import Head from "next/head";
import { Auth0Provider } from "@auth0/auth0-react";
import reduxStore from "../store";

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
						<Auth0Provider
							domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
							clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENTID!}
							audience={process.env.NEXT_PUBLIC_AUTH0_AUDIENCE!}
							redirectUri="http://localhost:3000/"
							scope="openid profile email"
						>
							<AppWrapper>
								<Component {...pageProps} />
							</AppWrapper>
						</Auth0Provider>
					</ReduxProvider>
				</ThemeProvider>
			</StyledEngineProvider>
		</>
	);
};

export default App;
