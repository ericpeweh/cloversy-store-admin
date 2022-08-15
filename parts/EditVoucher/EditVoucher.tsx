// Dependencies
import React, { useState } from "react";

// Styles
import {
	EditVoucherContainer,
	FormContainer,
	InputTitle,
	UserContainer
} from "./EditVoucher.styles";

// Icons
import DoneIcon from "@mui/icons-material/Done";
import RefreshIcon from "@mui/icons-material/Refresh";
import CasinoOutlinedIcon from "@mui/icons-material/CasinoOutlined";

// Components
import { Chip, Divider, Grid, ListItem, Stack } from "@mui/material";
import Button from "../../components/Button/Button";
import PageTitle from "../../components/PageTitle/PageTitle";
import TextInput from "../../components/TextInput/TextInput";
import SelectInput from "../../components/SelectInput/SelectInput";
import BoxButton from "../../components/BoxButton/BoxButton";
import DatePicker from "../../components/DatePicker/DatePicker";

type VoucherScopeType = "Scope" | "Global" | "User";

interface UserData {
	key: number;
	label: string;
}

const EditVoucher = () => {
	const [scope, setScope] = useState<VoucherScopeType>("User");

	const [usersData, setUsersData] = useState<readonly UserData[]>([
		{ key: 0, label: "ericpeweh@gmail.com" },
		{ key: 1, label: "mikicicimol@gmail.com" },
		{ key: 2, label: "cloversyaja@id.com" }
	]);

	const removeUserHandler = (userToDelete: UserData) => {
		setUsersData(users => users.filter(user => user.key !== userToDelete.key));
	};

	return (
		<EditVoucherContainer>
			<Stack direction="row" alignItems="center" justifyContent="space-between">
				<PageTitle>Edit Voucher</PageTitle>
				<Stack direction="row" alignItems="center" gap={1}>
					<Button size="small" color="secondary" variant="outlined">
						Discard
					</Button>
					<Button startIcon={<DoneIcon />} size="small" color="primary">
						Update Voucher
					</Button>
				</Stack>
			</Stack>
			<FormContainer>
				<Grid container spacing={3} alignItems="flex-start">
					<Grid container item xs={6} spacing={3}>
						<Grid item xs={12}>
							<TextInput id="title" label="Voucher title" />
						</Grid>
						<Grid item xs={12}>
							<SelectInput options={["Status", "Active", "Disabled"]} value={"Status"} />
						</Grid>
						<Grid item xs={12}>
							<Stack direction="row" gap={3}>
								<TextInput id="title" label="Voucher Code" />
								<BoxButton>
									<CasinoOutlinedIcon />
								</BoxButton>
							</Stack>
						</Grid>
						<Grid item xs={12}>
							<TextInput id="description" label="Description" multiline rows={10} />
						</Grid>
					</Grid>
					<Grid container item xs={6} spacing={3}>
						<Grid item xs={12}>
							<DatePicker label="Expiry Date" />
						</Grid>
						<Grid item xs={12}>
							<InputTitle>Discount Scope</InputTitle>
							<Grid item container xs={12} spacing={3}>
								<Grid item xs={scope === "User" ? 9 : 12}>
									<SelectInput options={["Scope", "Global", "User"]} value={scope} />
								</Grid>
								{scope === "User" && (
									<Grid item xs={3}>
										<Button variant="outlined" sx={{ height: "100%", width: "100%" }} size="small">
											Select User
										</Button>
									</Grid>
								)}
								{scope === "User" && (
									<Grid item xs={12}>
										<UserContainer>
											{usersData.map(data => {
												return (
													<ListItem key={data.key}>
														<Chip label={data.label} onDelete={() => removeUserHandler(data)} />
													</ListItem>
												);
											})}
										</UserContainer>
									</Grid>
								)}
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<InputTitle>Discount Type</InputTitle>
							<Stack direction="row" gap={3}>
								<SelectInput options={["Discount", "Value", "Percentage"]} value="Discount" />
								<TextInput id="title" label="Discount value / percentage" />
							</Stack>
						</Grid>
					</Grid>
				</Grid>
			</FormContainer>
		</EditVoucherContainer>
	);
};

export default EditVoucher;
