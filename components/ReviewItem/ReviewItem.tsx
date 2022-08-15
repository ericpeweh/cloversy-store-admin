// Dependencies
import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText, Rating } from "@mui/material";
import React from "react";

// Styles
import {
	ReviewContainer,
	ReviewDate,
	ReviewDescription,
	ReviewerName,
	ReviewItemContainer
} from "./ReviewItem.styles";

const ReviewItem = () => {
	return (
		<ReviewItemContainer item xs={6}>
			<ReviewContainer>
				<ListItem
					alignItems="flex-start"
					sx={{ padding: 0 }}
					secondaryAction={<Rating value={4.5} readOnly precision={0.5} />}
				>
					<ListItemAvatar>
						<Avatar alt="review name" src="/images/1.jpg" sx={{ width: "5rem", height: "5rem" }} />
					</ListItemAvatar>
					<ListItemText
						sx={{ ml: 2 }}
						primary={<ReviewerName>Mikici Mud</ReviewerName>}
						secondary={<ReviewDate>10 July 2022</ReviewDate>}
					/>
				</ListItem>
				<ReviewDescription>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe magnam repellendus et ajsd
					que ipsum dolor
				</ReviewDescription>
			</ReviewContainer>
		</ReviewItemContainer>
	);
};

export default ReviewItem;
