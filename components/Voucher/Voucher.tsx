// Dependencies
import React from "react";

// Styles
import {
	VoucherCode,
	VoucherContainer,
	VoucherContent,
	VoucherExpiry,
	VoucherImage,
	VoucherInfo,
	VoucherTitle
} from "./Voucher.styles";

// Icons
import DiscountIcon from "@mui/icons-material/Discount";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

// Components
import { IconButton, Stack } from "@mui/material";
import Tooltip from "../Tooltip/Tooltip";
import BoxButton from "../BoxButton/BoxButton";

interface VoucherProps {
	title: string;
	expiryDate: string;
	code: string;
	onOpenDetail: () => void;
	onOpenMenu: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Voucher = ({ title, expiryDate, code, onOpenDetail, onOpenMenu }: VoucherProps) => {
	return (
		<VoucherContainer>
			<VoucherImage>
				<DiscountIcon fontSize="large" />
			</VoucherImage>
			<VoucherInfo>
				<VoucherContent>
					<VoucherTitle>{title}</VoucherTitle>
					<VoucherExpiry>Berlaku hingga {expiryDate}</VoucherExpiry>
				</VoucherContent>
				<VoucherCode>
					<Tooltip title="Salin kode">
						<IconButton>
							<ContentCopyIcon />
						</IconButton>
					</Tooltip>
					{code}
				</VoucherCode>
			</VoucherInfo>
			<Stack justifyContent="center" p={1} gap={1}>
				<BoxButton sx={{ flex: 1 }} onClick={onOpenDetail}>
					Detail
				</BoxButton>
				<BoxButton sx={{ flex: 1 }} onClick={onOpenMenu}>
					<MoreHorizIcon />
				</BoxButton>
			</Stack>
		</VoucherContainer>
	);
};

export default Voucher;
