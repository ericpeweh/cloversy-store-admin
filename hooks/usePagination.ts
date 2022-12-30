// Dependencies
import { useState } from "react";

// Utils
import scrollToTop from "../utils/scrollToTop";

const usePagination = (autoScroll: boolean = false) => {
	const [page, setPage] = useState(1);

	const pageChangeHandler = (_: React.ChangeEvent<unknown> | null, value: number) => {
		setPage(value);
		autoScroll && scrollToTop();
	};

	return { page, onChange: pageChangeHandler };
};

export default usePagination;
