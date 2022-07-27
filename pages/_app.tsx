// Dependencies
import { useEffect } from "react";
import type { AppProps } from "next/app";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { Provider as ReduxProvider } from "react-redux";
import reduxStore from "../store";
import Head from "next/head";

// Styles
import "../styles/globals.css";

// Theme
import mainTheme from "../styles/mainTheme";

// Components
import AppWrapper from "../parts/AppWrapper/AppWrapper";
import { CssBaseline } from "@mui/material";

const App = ({ Component, pageProps }: AppProps) => {
	// Prevent navbar shifting on open dialog
	useEffect(() => {
		const body = document.body;
		const observer = new MutationObserver(mutations => {
			mutations.forEach((mutationRecord: any) => {
				const navbar = document.getElementById("navbar");
				if (navbar === null) return;
				if (mutationRecord.target.style[0] === "padding-right") {
					navbar.style.paddingRight = "4rem";
				} else {
					navbar.style.paddingRight = "3rem";
				}
			});
		});

		observer.observe(body, { attributes: true, attributeFilter: ["style"] });
	}, []);

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
