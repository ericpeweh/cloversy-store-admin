// Dependencies
import React, { useState } from "react";

// Styles
import {
	EditOrderContainer,
	FormContainer,
	InputTitle,
	TimelineAction,
	TimelineItem,
	TimelineText
} from "./EditOrder.styles";

// Icons
import DoneIcon from "@mui/icons-material/Done";
import AddIcon from "@mui/icons-material/Add";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DeleteIcon from "@mui/icons-material/Delete";

// Components
import { Grid, IconButton, Stack } from "@mui/material";
import Button from "../../components/Button/Button";
import PageTitle from "../../components/PageTitle/PageTitle";
import TextInput from "../../components/TextInput/TextInput";
import SelectInput from "../../components/SelectInput/SelectInput";
import BoxButton from "../../components/BoxButton/BoxButton";
import DateTimePicker from "../../components/DateTimePicker/DateTimePicker";
import StatusBadge from "../../components/StatusBadge/StatusBadge";

const EditOrder = () => {
	return (
		<EditOrderContainer>
			<Stack direction="row" alignItems="center" justifyContent="space-between">
				<PageTitle>Edit Order</PageTitle>
				<Stack direction="row" alignItems="center" gap={1}>
					<Button size="small" color="secondary" variant="outlined">
						Discard
					</Button>
					<Button startIcon={<DoneIcon />} size="small" color="primary">
						Update Order
					</Button>
				</Stack>
			</Stack>
			<FormContainer>
				<Grid container spacing={{ xs: 2, lg: 3 }} alignItems="flex-start">
					<Grid item xs={12} md={6}>
						<Grid container spacing={{ xs: 2, md: 3 }}>
							<Grid item xs={12}>
								<TextInput id="title" label="No Invoice" />
							</Grid>
							<Grid item xs={12}>
								<TextInput id="email" label="Email" />
							</Grid>
							<Grid item xs={12}>
								<TextInput id="contact" label="Contact" />
							</Grid>
							<Grid item xs={12}>
								<TextInput id="customerNote" label="Customer note" multiline rows={5} />
							</Grid>
							<Grid item xs={12}>
								<TextInput id="orderNote" label="Order note" multiline rows={5} />
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12} md={6}>
						<Grid container spacing={{ xs: 2, md: 3 }}>
							<Grid item xs={12}>
								<SelectInput
									options={[
										"Order status",
										"Awaiting payment",
										"Confirmed",
										"On Progress",
										"Shipped",
										"Delivered",
										"Canceled",
										"Pending"
									]}
									value={"Order status"}
								/>
							</Grid>
							<Grid item xs={12}>
								<InputTitle>Pengiriman</InputTitle>
								<TextInput id="noResi" label="No Resi Pengiriman" />
							</Grid>
							<Grid item xs={12}>
								<InputTitle>Timeline Pesanan</InputTitle>
								<Grid container spacing={2}>
									<Grid item xs={12} sm={5}>
										<DateTimePicker label="Timeline Time & Date" />
									</Grid>
									<Grid item xs={12} sm={6}>
										<TextInput id="noResi" label="Timeline description" />
									</Grid>
									<Grid item xs={12} sm={1}>
										<BoxButton
											sx={{
												width: "100%",
												height: "100%",
												backgroundColor: "primary.main",
												color: "#fff"
											}}
										>
											<AddIcon />
										</BoxButton>
									</Grid>
								</Grid>
							</Grid>
							{[1, 2, 3, 4].map((item, i, arr) => (
								<Grid key={item} container item xs={12} spacing={2}>
									<Grid item xs={12}>
										<TimelineItem>
											<Stack gap={1}>
												<StatusBadge color="secondary">7 Aug 2022, 10:20</StatusBadge>
												<TimelineText>Pembayaran berhasil & pesanan dikonfirmasi</TimelineText>
											</Stack>
											{i !== 3 && (
												<TimelineAction>
													<IconButton>
														<ArrowDownwardIcon fontSize="small" />
													</IconButton>
													{i !== 0 && (
														<IconButton>
															<ArrowUpwardIcon fontSize="small" />
														</IconButton>
													)}
													<IconButton>
														<DeleteIcon fontSize="small" />
													</IconButton>
												</TimelineAction>
											)}
										</TimelineItem>
									</Grid>
								</Grid>
							))}
						</Grid>
					</Grid>
				</Grid>
			</FormContainer>
		</EditOrderContainer>
	);
};

export default EditOrder;
