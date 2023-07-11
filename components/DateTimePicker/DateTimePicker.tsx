// Dependencies
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";

// Types
import type { DateTime as DateTimeType } from "luxon";

// Styles
import { DateTimePickerContainer } from "./DateTimePicker.styles";

// Components
import { DateTimePicker as MuiDateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TextField } from "@mui/material";

interface DateTimePickerProps {
	label: string;
	onChange: (newValue: DateTimeType) => void;
	value: DateTimeType;
	minDateTime?: DateTimeType;
}

const DateTimePicker = ({ label, onChange, value, minDateTime }: DateTimePickerProps) => {
	const handleChange = (newValue: DateTimeType | null) => {
		if (newValue) {
			onChange(newValue);
		}
	};

	return (
		<DateTimePickerContainer>
			<LocalizationProvider dateAdapter={AdapterLuxon}>
				<MuiDateTimePicker
					minDateTime={minDateTime}
					label={label}
					inputFormat="dd/MM/yyyy hh:mm a"
					value={value}
					onChange={handleChange}
					renderInput={params => <TextField {...params} />}
					PaperProps={{
						sx: {
							"& span[role='option']": { fontSize: { xs: "1.4rem", sm: "1.5rem", md: "1.6rem" } }
						}
					}}
				/>
			</LocalizationProvider>
		</DateTimePickerContainer>
	);
};

export default DateTimePicker;
