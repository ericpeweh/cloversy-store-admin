// Dependencies
import { useState } from "react";

// Utils
import scrollToTop from "../utils/scrollToTop";

interface UsePaginationArgs {
	autoScroll?: boolean;
}

const usePagination = ({ autoScroll = false }: UsePaginationArgs = {}) => {
	const [page, setPage] = useState(1);

	const pageChangeHandler = (_: React.ChangeEvent<unknown> | null, value: number) => {
		setPage(value);
		autoScroll && scrollToTop();
	};

	return { page, onChange: pageChangeHandler };
};

export default usePagination;
