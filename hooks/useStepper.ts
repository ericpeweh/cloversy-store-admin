// Dependencies
import { useState } from "react";

const useStepper = () => {
	const [activeStep, setActiveStep] = useState(0);

	const nextHandler = () => {
		setActiveStep(prev => prev + 1);
	};

	const backHandler = () => {
		setActiveStep(prev => prev - 1);
	};

	return { activeStep, nextHandler, backHandler };
};

export default useStepper;
