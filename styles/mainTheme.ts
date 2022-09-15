// Dependencies
import { ThemeOptions, createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

/* Breakpoints
  xs: 0
  sm: 600
  md: 900
  lg: 1200
  xl: 1536
*/

const themeOptions: ThemeOptions = {
	palette: {
		primary: {
			main: "#55904E"
		},
		secondary: {
			main: "#282828"
		},
		grey: {
			...grey
		}
	},
	typography: {
		htmlFontSize: 10
	},
	components: {
		MuiAppBar: {
			styleOverrides: {
				root: {
					color: "default"
				}
			}
		},
		MuiSwitch: {
			styleOverrides: {
				root: {
					width: 42,
					height: 26,
					padding: 0,
					margin: 8
				},
				switchBase: {
					padding: 1,
					"&$checked, &$colorPrimary$checked, &$colorSecondary$checked": {
						transform: "translateX(16px)",
						color: "#fff",
						"& + $track": {
							opacity: 1,
							border: "none"
						}
					}
				},
				thumb: {
					width: 24,
					height: 24
				},
				track: {
					borderRadius: 13,
					border: "1px solid #bdbdbd",
					backgroundColor: "#fafafa",
					opacity: 1,
					transition:
						"background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
				}
			}
		}
	}
};

export default createTheme(themeOptions);
