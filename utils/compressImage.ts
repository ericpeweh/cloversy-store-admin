// Dependencies
import imageCompression from "browser-image-compression";

interface CompressionOptionsType {
	maxSizeMB: number;
	maxWidthOrHeight: number;
	initialQuality: number;
	useWebWorker: boolean;
}

const compressionOptions: CompressionOptionsType = {
	maxSizeMB: 1,
	maxWidthOrHeight: 1024,
	initialQuality: 0.7,
	useWebWorker: true
};

const compressImage = async (image: File, options: Partial<CompressionOptionsType> = {}) => {
	const compressedImage = await imageCompression(image, { ...compressionOptions, ...options });

	return compressedImage;
};

export default compressImage;
