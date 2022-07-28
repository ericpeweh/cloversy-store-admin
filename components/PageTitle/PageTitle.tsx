// Dependencies
import React from "react";

// Styles
import { PageTitleContainer } from "./PageTitle.styles";

interface PageTitleProps {
	children: string;
}

const PageTitle = ({ children }: PageTitleProps) => {
	return <PageTitleContainer>{children}</PageTitleContainer>;
};

export default PageTitle;
