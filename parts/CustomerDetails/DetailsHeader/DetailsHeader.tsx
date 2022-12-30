// Dependencies
import React, { useEffect, useState } from "react";

// Hooks
import { useUpdateCustomerMutation } from "../../../api/customer.api";

// Types
import { Customer, CustomerStatus } from "../../../interfaces";

// Components
import { Alert, SelectChangeEvent, Stack } from "@mui/material";
import BoxButton from "../../../components/BoxButton/BoxButton";
import PageTitle from "../../../components/PageTitle/PageTitle";
import SelectInput from "../../../components/SelectInput/SelectInput";

interface DetailsHeaderProps {
	customerData: Customer;
}

const DetailsHeader = ({ customerData }: DetailsHeaderProps) => {
	const userStatus = customerData?.user_status;
	const [userStatusInput, setUserStatusInput] = useState(userStatus);

	const [
		updateUserStatus,
		{
			isLoading: isUpdateUserStatusLoading,
			error: updateUserStatusError,
			isSuccess: isUpdateUserStatusSuccess,
			reset: resetUpdateStatus
		}
	] = useUpdateCustomerMutation();
	const userStatusError: any = updateUserStatusError;

	const userStatusInputChangeHandler = (e: SelectChangeEvent<unknown>) => {
		setUserStatusInput(e.target.value as CustomerStatus);
	};

	const updateUserStatusHandler = () => {
		if (userStatusInput !== customerData?.user_status && customerData?.id) {
			updateUserStatus({
				prev_status: userStatus,
				user_status: userStatusInput,
				id: customerData?.id
			});
		}
	};

	useEffect(() => {
		if (userStatus) {
			setUserStatusInput(userStatus);
		}
	}, [userStatus]);

	useEffect(() => {
		if (isUpdateUserStatusSuccess) {
			resetUpdateStatus();
		}
	}, [isUpdateUserStatusSuccess, resetUpdateStatus]);

	return (
		<Stack
			direction={{ xs: "column", sm: "row" }}
			alignItems={{ xs: "flex-start", sm: "center" }}
			justifyContent="space-between"
			gap={{ xs: 1, sm: 0 }}
		>
			<PageTitle sx={{ mb: 0 }}>Customer Detail</PageTitle>
			<Stack direction="column">
				<Stack direction="row" gap={1} height="4rem" width={{ xs: "100%", sm: "auto" }}>
					{userStatusInput && (
						<>
							<SelectInput
								options={[
									{ label: "Active", value: "active" },
									{ label: "Banned", value: "banned" }
								]}
								value={userStatusInput}
								onChange={userStatusInputChangeHandler}
								size="small"
								sx={{
									width: { xs: "100%", sm: "25rem" }
								}}
							/>
							<BoxButton
								loading={isUpdateUserStatusLoading}
								sx={{ mr: { xs: 0, sm: 1 } }}
								onClick={updateUserStatusHandler}
							>
								Save
							</BoxButton>
						</>
					)}
				</Stack>
				{updateUserStatusError && (
					<Alert severity="error" sx={{ alignSelf: "flex-end" }}>
						{userStatusError?.data.message}
					</Alert>
				)}
			</Stack>
		</Stack>
	);
};

export default DetailsHeader;
