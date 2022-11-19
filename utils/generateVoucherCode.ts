// Dependencies
import voucherCode from "voucher-code-generator";

const generateVoucherCode = () => {
	return voucherCode
		.generate({
			length: 10
		})[0]
		.toUpperCase();
};

export default generateVoucherCode;
