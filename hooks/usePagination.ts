// Dependencies
import { useState } from "react";

// Utils
import scrollToTop from "../utils/scrollToTop";

const usePagination = () => {
	const [page, setPage] = useState(1);

	const pageChangeHandler = (_: React.ChangeEvent<unknown> | null, value: number) => {
		setPage(value);
		scrollToTop();
	};

	return { page, onChange: pageChangeHandler };
};

export default usePagination;
