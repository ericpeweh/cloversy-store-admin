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
}

const DateTimePicker = ({ label, onChange, value }: DateTimePickerProps) => {
	const handleChange = (newValue: DateTimeType | null) => {
		if (newValue) {
			onChange(newValue);
		}
	};

	return (
		<DateTimePickerContainer>
			<LocalizationProvider dateAdapter={AdapterLuxon}>
				<MuiDateTimePicker
					label={label}
					inputFormat="dd/MM/yyyy hh:mm a"
					value={value}
					onChange={handleChange}
					renderInput={params => <TextField {...params} />}
				/>
			</LocalizationProvider>
		</DateTimePickerContainer>
	);
};

export default DateTimePicker;
