const disableScroll = () => {
	document.body.style.overflow = "hidden";
	document.body.style.userSelect = "none";
};

const enableScroll = () => {
	document.body.style.overflow = "auto";
	document.body.style.userSelect = "auto";
};

export { disableScroll, enableScroll };
