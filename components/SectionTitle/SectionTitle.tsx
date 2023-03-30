// Dependencies
import React from "react";

// Styles
import { SectionTitleContainer } from "./SectionTitle.styles";

// Types
import { SxProps } from "@mui/material";

interface SectionTitleProps {
	children: string;
	sx?: SxProps;
}

const SectionTitle = ({ children, ...props }: SectionTitleProps) => {
	return <SectionTitleContainer {...props}>{children}</SectionTitleContainer>;
};

export default SectionTitle;
