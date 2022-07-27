// Dependencies
import { useState } from "react";

const useModal = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModalHandler = () => setIsModalOpen(true);

	const closeModalHandler = () => setIsModalOpen(false);

	return {
		isOpen: isModalOpen,
		openHandler: openModalHandler,
		closeHandler: closeModalHandler
	};
};

export default useModal;
