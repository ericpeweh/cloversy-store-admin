// Dependencies
import {
	TableContainer as MuiTableContainer,
	Table as MuiTable,
	TableHead as MuiTableHead,
	TableRow as MuiTableRow,
	TableCell as MuiTableCell,
	TableBody as MuiTableBody
} from "@mui/material";
import { styled } from "@mui/system";

export const TableContainer = styled(MuiTableContainer)({}) as typeof MuiTableContainer;

export const TableInnerContainer = styled(MuiTable)({
	width: "100%"
}) as typeof MuiTable;

export const TableHead = styled(MuiTableHead)(({ theme }) => ({
	backgroundColor: theme.palette.grey[200]
})) as typeof MuiTableHead;

export const TableRow = styled(MuiTableRow)({}) as typeof MuiTableRow;

export const TableCell = styled(MuiTableCell)(({ theme }) => ({
	fontSize: "1.6rem",
	minWidth: "12rem",
	whiteSpace: "nowrap",
	[theme.breakpoints.down("md")]: {
		fontSize: "1.5rem"
	},
	[theme.breakpoints.down("sm")]: {
		padding: "1.5rem",
		fontSize: "1.4rem"
	}
})) as typeof MuiTableCell;

export const TableBody = styled(MuiTableBody)({}) as typeof MuiTableBody;
