// Dependencies
import React from "react";

// Components
import {
	TimelineConnector,
	TimelineContent,
	TimelineDot,
	TimelineItem,
	TimelineOppositeContent,
	TimelineSeparator
} from "@mui/lab";

// Styles
import { TimelineContainer } from "./Timeline.styles";

interface TimelineProps {
	items: { date: string; desc: string }[];
}

const Timeline = ({ items }: TimelineProps) => {
	return (
		<TimelineContainer position="left" sx={{ pl: 0 }}>
			{items.map((item, i) => {
				const isLastItem = i === items.length - 1;
				const isFirstItem = i === 0;

				return (
					<TimelineItem sx={{ justifyContent: "center" }} key={item.date}>
						<TimelineOppositeContent
							color="text.secondary"
							sx={{ fontSize: { xs: "1.4rem", sm: "1.5rem" } }}
						>
							{item.desc}
						</TimelineOppositeContent>
						<TimelineSeparator>
							<TimelineDot
								color={isFirstItem ? "primary" : "grey"}
								sx={{
									boxShadow: `0 0 0 0.5rem ${
										isFirstItem ? "rgba(85 144 78 / 30%)" : "rgba(0 0 0 /10%)"
									}`
								}}
							/>
							{!isLastItem && <TimelineConnector />}
						</TimelineSeparator>
						<TimelineContent
							sx={{
								flex: "0 0 18rem",
								pl: 0,
								pr: 3,
								fontSize: { xs: "1.4rem", sm: "1.5rem" },
								textAlign: "left"
							}}
						>
							{item.date}
						</TimelineContent>
					</TimelineItem>
				);
			})}
		</TimelineContainer>
	);
};

export default Timeline;
