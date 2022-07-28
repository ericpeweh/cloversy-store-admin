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

export const TableInnerContainer = styled(MuiTable)({}) as typeof MuiTable;

export const TableHead = styled(MuiTableHead)(({ theme }) => ({
	backgroundColor: theme.palette.grey[200]
})) as typeof MuiTableHead;

export const TableRow = styled(MuiTableRow)({}) as typeof MuiTableRow;

export const TableCell = styled(MuiTableCell)({
	fontSize: "1.6rem",
	minWidth: "20rem"
}) as typeof MuiTableCell;

export const TableBody = styled(MuiTableBody)({}) as typeof MuiTableBody;
