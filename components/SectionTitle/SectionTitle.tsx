// Dependencies
import React from "react";

// Styles
import { SectionTitleContainer } from "./SectionTitle.styles";

interface SectionTitleProps {
	children: string;
}

const SectionTitle = ({ children }: SectionTitleProps) => {
	return <SectionTitleContainer>{children}</SectionTitleContainer>;
};

export default SectionTitle;
