// Dependencies
import { styled } from "@mui/system";

// Components
import { FormControlLabel, FormGroup } from "@mui/material";

export const CheckboxContainer = styled(FormGroup)({}) as typeof FormGroup;

export const CheckboxLabel = styled(FormControlLabel)({
	"& .MuiFormControlLabel-label": {
		userSelect: "none"
	}
}) as typeof FormControlLabel;
