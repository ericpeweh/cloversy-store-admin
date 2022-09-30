// Dependencies
import React, { useState } from "react";

// Styles
import {
	EditEmailMarketingContainer,
	FormContainer,
	InputTitle
} from "./EditEmailMarketing.styles";

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

const EditEmailMarketing = () => {
	const [scheduledEmailMarketing, setScheduledEmailMarketing] = useState<boolean>(false);

	const {
		isOpen: isSelectCustomerModalOpen,
		openHandler: selectCustomerModalOpenHandler,
		closeHandler: selectCustomerModalCloseHandler
	} = useModal();

	return (
		<EditEmailMarketingContainer>
			<UserPickerModal open={isSelectCustomerModalOpen} onClose={selectCustomerModalCloseHandler} />
			<Stack
				direction={{ xs: "column", sm: "row" }}
				alignItems={{ xs: "flex-start", sm: "center" }}
				justifyContent="space-between"
			>
				<PageTitle sx={{ mb: { xs: 1, sm: 0 } }}>Edit Email Marketing</PageTitle>
				<Stack direction="row" alignItems="center" gap={1}>
					<Button size="small" color="secondary" variant="outlined">
						Discard
					</Button>
					<Button startIcon={<DoneIcon />} size="small" color="primary">
						Update Email Marketing
					</Button>
				</Stack>
			</Stack>
			<FormContainer>
				<Grid container spacing={{ xs: 1, sm: 3, lg: 4, xl: 5 }} alignItems="flex-start">
					<Grid item xs={12} md={6}>
						<Grid container spacing={{ xs: 2, md: 3 }}>
							<Grid item xs={12}>
								<InputTitle>Email Marketing Detail</InputTitle>
								<TextInput id="title" label="Marketing title" />
							</Grid>
							<Grid item xs={12}>
								<TextInput
									label="Marketing Description"
									id="marketingNotification"
									multiline
									rows={4}
								/>
							</Grid>
							<Grid item xs={12}>
								<InputTitle>Email Marketing Target</InputTitle>
								<Grid item container xs={12} spacing={{ xs: 1, sm: 2, md: 3 }} rowSpacing={2}>
									<Grid item xs={7} lg={8} xl={9}>
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
									<Grid item xs={5} lg={4} xl={3}>
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
											30 Users Selected
										</Button>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Checkbox
									label="Jadwalkan email marketing"
									checked={scheduledEmailMarketing}
									onChange={setScheduledEmailMarketing}
								/>
							</Grid>
							{scheduledEmailMarketing && (
								<Grid item xs={12}>
									<DateTimePicker label="Trigger Time" />
								</Grid>
							)}
						</Grid>
					</Grid>
					<Grid item xs={12} md={6} spacing={3}>
						<Grid container spacing={{ xs: 2, md: 3 }}>
							<Grid item xs={12}>
								<InputTitle>Email Info</InputTitle>
								<TextInput id="emailSubject" label="Email Subject" />
							</Grid>
							<Grid item xs={12}>
								<TextInput id="actionLink" label="Action Link" />
							</Grid>
							<Grid item xs={12}>
								<TextInput id="emailBody" label="Email Body" multiline rows={6} />
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</FormContainer>
		</EditEmailMarketingContainer>
	);
};

export default EditEmailMarketing;
