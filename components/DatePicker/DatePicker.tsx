// Dependencies
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";

// Types
import type { DateTime as DateTimeType } from "luxon";

// Styles
import { DatePickerContainer } from "./DatePicker.styles";

// Components
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";

interface DatePickerProps {
	label: string;
	onChange: Function;
	value: DateTimeType;
}

const DatePicker = ({ label, onChange, value }: DatePickerProps) => {
	const handleChange = (newValue: DateTimeType | null) => {
		if (newValue) {
			onChange(newValue);
		}
	};

	return (
		<DatePickerContainer>
			<LocalizationProvider dateAdapter={AdapterLuxon}>
				<MuiDatePicker
					label={label}
					inputFormat="dd/MM/yyyy"
					value={value}
					onChange={handleChange}
					renderInput={params => <TextField {...params} />}
				/>
			</LocalizationProvider>
		</DatePickerContainer>
	);
};

export default DatePicker;
