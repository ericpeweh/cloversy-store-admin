const formatToRupiah = (value: number) => {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR"
	})
		.format(value)
		.slice(0, -3);
};

export default formatToRupiah;
