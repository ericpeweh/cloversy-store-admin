// Dependencies
import { styled } from "@mui/system";

// Components
import { Timeline } from "@mui/lab";

export const TimelineContainer = styled(Timeline)(({ theme }) => ({
	[theme.breakpoints.down("md")]: {
		paddingRight: "0"
	}
}));
