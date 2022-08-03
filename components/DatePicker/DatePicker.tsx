// Dependencies
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";

// Styles
import { DatePickerContainer } from "./DatePicker.styles";

// Components
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";

interface DatePickerProps {
	label: string;
}

const DatePicker = ({ label }: DatePickerProps) => {
	const [selectedDate, setSelectedDate] = React.useState<Date | null>(
		new Date("2022-08-03T21:11:54")
	);

	const handleChange = (newValue: Date | null) => {
		setSelectedDate(newValue);
	};

	return (
		<DatePickerContainer>
			<LocalizationProvider dateAdapter={AdapterLuxon}>
				<MuiDatePicker
					label={label}
					inputFormat="dd/MM/yyyy"
					value={selectedDate}
					onChange={handleChange}
					renderInput={params => <TextField {...params} />}
				/>
			</LocalizationProvider>
		</DatePickerContainer>
	);
};

export default DatePicker;
