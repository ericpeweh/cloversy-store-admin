const getYearInputOptions = () => {
	const years = ["2022", "2023", "2024", "2025"];
	const options = years.map(year => ({ label: year, value: year }));

	return options;
};

export default getYearInputOptions;
