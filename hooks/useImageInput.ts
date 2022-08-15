import { useState } from "react";

interface ImageUrlType {
	name: string;
	id: string;
	url: string;
}

interface ImageType {
	file: File;
	id: string;
}

const useImageInput = () => {
	const [images, setImages] = useState<ImageType[] | []>([]);
	const [imagesUrl, setImagesUrl] = useState<ImageUrlType[] | []>([]);

	return { images, imagesUrl, setImages, setImagesUrl };
};

export default useImageInput;
