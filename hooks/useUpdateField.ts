import { useEffect, useRef } from "react";

interface UseUpdateFieldProps {
	setFieldValue: React.Dispatch<React.SetStateAction<any>>;
	name: string;
	value: any;
}

const useUpdateField = ({ setFieldValue, name, value }: UseUpdateFieldProps) => {
	const flagRef = useRef(true);

	// To handle dynamic name
	useEffect(() => {
		if (flagRef.current) {
			flagRef.current = false;
			return;
		}

		setFieldValue(value);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [name]);
};

export default useUpdateField;
