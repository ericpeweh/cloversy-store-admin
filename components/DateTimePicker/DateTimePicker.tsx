// Dependencies
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";

// Styles
import { DateTimePickerContainer } from "./DateTimePicker.styles";

// Components
import { DateTimePicker as MuiDateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TextField } from "@mui/material";

interface DateTimePickerProps {
	label: string;
}

const DateTimePicker = ({ label }: DateTimePickerProps) => {
	const [selectedDate, setSelectedDate] = React.useState<Date | null>(
		new Date("2022-08-03T21:11:54")
	);

	const handleChange = (newValue: Date | null) => {
		setSelectedDate(newValue);
	};

	return (
		<DateTimePickerContainer>
			<LocalizationProvider dateAdapter={AdapterLuxon}>
				<MuiDateTimePicker
					label={label}
					inputFormat="dd/MM/yyyy hh:mm a"
					value={selectedDate}
					onChange={handleChange}
					renderInput={params => <TextField {...params} />}
				/>
			</LocalizationProvider>
		</DateTimePickerContainer>
	);
};

export default DateTimePicker;
