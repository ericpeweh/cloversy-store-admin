// Dependencies
import { SxProps } from "@mui/material";
import React from "react";

// Styles
import { PageTitleContainer } from "./PageTitle.styles";

interface PageTitleProps {
	children: string;
	sx?: SxProps;
}

const PageTitle = ({ children, sx }: PageTitleProps) => {
	return <PageTitleContainer sx={sx}>{children}</PageTitleContainer>;
};

export default PageTitle;
