// Dependencies
import { useState, useEffect } from "react";

const useWindowSize = () => {
	const [width, setWidth] = useState<number>(0);
	const [height, setHeight] = useState<number>(0);

	const windowSizeChangeHandler = () => {
		setWidth(window.innerWidth);
		setHeight(window.innerHeight);
	};

	useEffect(() => {
		windowSizeChangeHandler();
	}, []);

	useEffect(() => {
		window.addEventListener("resize", windowSizeChangeHandler);

		return () => {
			window.removeEventListener("resize", windowSizeChangeHandler);
		};
	}, []);

	return { wWidth: width, wHeight: height };
};

export default useWindowSize;
