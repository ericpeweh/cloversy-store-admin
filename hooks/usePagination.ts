// Dependencies
import { useState } from "react";

const usePagination = () => {
	const [page, setPage] = useState(1);

	const pageChangeHandler = (_: React.ChangeEvent<unknown> | null, value: number) => {
		setPage(value);
	};

	return { page, onChange: pageChangeHandler };
};

export default usePagination;
