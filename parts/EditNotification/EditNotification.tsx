// Dependencies
import React, { useState } from "react";

// Styles
import { EditNotificationContainer, FormContainer, InputTitle } from "./EditNotification.styles";

// Icons
import DoneIcon from "@mui/icons-material/Done";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";

// Hooks
import useModal from "../../hooks/useModal";

// Components
import { Grid, Stack } from "@mui/material";
import Button from "../../components/Button/Button";
import PageTitle from "../../components/PageTitle/PageTitle";
import TextInput from "../../components/TextInput/TextInput";
import SelectInput from "../../components/SelectInput/SelectInput";
import Checkbox from "../../components/Checkbox/Checkbox";
import DateTimePicker from "../../components/DateTimePicker/DateTimePicker";
import UserPickerModal from "../../components/UserPickerModal/UserPickerModal";

const EditNotification = () => {
	const [scheduledNotification, setScheduledNotification] = useState<boolean>(false);

	const {
		isOpen: isSelectCustomerModalOpen,
		openHandler: selectCustomerModalOpenHandler,
		closeHandler: selectCustomerModalCloseHandler
	} = useModal();

	return (
		<EditNotificationContainer>
			<UserPickerModal open={isSelectCustomerModalOpen} onClose={selectCustomerModalCloseHandler} />
			<Stack direction="row" alignItems="center" justifyContent="space-between">
				<PageTitle>Edit Notification</PageTitle>
				<Stack direction="row" alignItems="center" gap={1}>
					<Button size="small" color="secondary" variant="outlined">
						Discard
					</Button>
					<Button startIcon={<DoneIcon />} size="small" color="primary">
						Update Notification
					</Button>
				</Stack>
			</Stack>
			<FormContainer>
				<Grid container spacing={3} alignItems="flex-start">
					<Grid container item xs={6} spacing={3}>
						<Grid item xs={12}>
							<InputTitle>Notification Detail</InputTitle>
							<TextInput id="title" label="Notification title" />
						</Grid>
						<Grid item xs={12}>
							<SelectInput options={["Web", "Push"]} value="Web" label="Notification Type" />
						</Grid>
						<Grid item xs={12}>
							<TextInput label="Deskripsi notifikasi" id="deskripsiNotifikasi" multiline rows={4} />
						</Grid>
						<Grid item xs={12}>
							<InputTitle>Notification Target</InputTitle>
							<Grid item container xs={12} spacing={3}>
								<Grid item xs={9}>
									<SelectInput
										options={[
											"All customers",
											"Selected customers",
											"Random 50",
											"Random 100",
											"Random 200",
											"Random 300"
										]}
										value="All customers"
										label="Select target"
									/>
								</Grid>
								<Grid item xs={3}>
									<Button
										variant="outlined"
										sx={{ height: "100%", width: "100%" }}
										size="small"
										onClick={selectCustomerModalOpenHandler}
									>
										Select User
									</Button>
								</Grid>
								<Grid item xs={12}>
									<Button size="small" startIcon={<GroupOutlinedIcon />}>
										25 Users Selected
									</Button>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<Checkbox
								label="Jadwalkan notifikasi"
								checked={scheduledNotification}
								onChange={setScheduledNotification}
							/>
						</Grid>
						{scheduledNotification && (
							<Grid item xs={12}>
								<DateTimePicker label="Trigger Time" />
							</Grid>
						)}
					</Grid>
					<Grid container item xs={6} spacing={3}>
						<Grid item xs={12}>
							<InputTitle>Message Info</InputTitle>
							<TextInput id="messageTitle" label="Message Title" />
						</Grid>
						<Grid item xs={12}>
							<TextInput id="actionLink" label="Action Link" />
						</Grid>
						<Grid item xs={12}>
							<TextInput label="Message Body" id="messageBody" multiline rows={4} />
						</Grid>
					</Grid>
				</Grid>
			</FormContainer>
		</EditNotificationContainer>
	);
};

export default EditNotification;
