// Dependencies
import React from "react";

// Styles
import {
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableInnerContainer,
	TableRow
} from "./Table.styles";

interface TableProps {
	children: React.ReactNode | React.ReactNode[];
	headData: string[];
}

const Table = ({ children, headData }: TableProps) => {
	return (
		<TableContainer>
			<TableInnerContainer>
				<TableHead>
					<TableRow>
						{headData.map((title, i) => (
							<TableCell key={title}>{title}</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>{children}</TableBody>
			</TableInnerContainer>
		</TableContainer>
	);
};

export default Table;
