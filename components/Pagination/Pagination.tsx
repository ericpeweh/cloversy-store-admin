// Dependencies
import React from "react";
import { PaginationProps as MuiPaginationProps } from "@mui/material";

// Styles
import { PaginationContainer } from "./Pagination.styles";

interface PaginationProps extends MuiPaginationProps {
	count: number;
	page: number;
	onChange: (_: React.ChangeEvent<unknown>, value: number) => void;
}

const Pagination = ({ count, page, onChange, ...props }: PaginationProps) => {
	return <PaginationContainer count={count} page={page} onChange={onChange} {...props} />;
};

export default Pagination;
