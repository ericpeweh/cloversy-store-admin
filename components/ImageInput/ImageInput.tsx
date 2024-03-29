// Dependencies
import React, { ChangeEvent, useRef } from "react";
import { v4 as uuid } from "uuid";

// Styles
import {
	DeleteButton,
	ImageContainer,
	ImageInputContainer,
	InputContainer,
	InputLabel
} from "./ImageInput.styles";

// Icons
import AddBoxIcon from "@mui/icons-material/AddBox";
import CloseIcon from "@mui/icons-material/Close";

// Components
import { Grid } from "@mui/material";
import { SetFieldValue } from "../../interfaces";

interface ImageUrlType {
	name: string;
	id: string;
	url: string;
}

interface ImageType {
	file: File;
	id: string;
}

interface ImageInputProps {
	imagesUrl: ImageUrlType[];
	images: ImageType[];
	setImages: React.Dispatch<React.SetStateAction<ImageType[]>>;
	setImagesUrl: React.Dispatch<React.SetStateAction<ImageUrlType[]>>;
	setFieldValue?: SetFieldValue;
	originalImagesData?: string[];
	removedImages?: string[];
}

const ImageInput = ({
	imagesUrl,
	setImages,
	setImagesUrl,
	setFieldValue,
	originalImagesData,
	removedImages
}: ImageInputProps) => {
	const fileInputElRef = useRef<HTMLInputElement>(null);

	const removeImageHandler = (imageId: string) => {
		setImages(prev => prev.filter((file: ImageType) => file.id !== imageId));
		setImagesUrl(prev => prev.filter((file: ImageUrlType) => file.id !== imageId));

		if (setFieldValue && originalImagesData && removedImages) {
			if (originalImagesData.includes(imageId)) {
				setFieldValue("removedImages", [...removedImages, imageId]);
			}
		}
	};

	const addImageHandler = (event: ChangeEvent<HTMLInputElement>) => {
		const imagesToAdd = event.target.files;

		if (imagesToAdd) {
			for (const file of imagesToAdd) {
				const imageId = uuid();
				// For images request
				setImages(prev => [...prev, { file, id: imageId }]);
				// For image display
				setImagesUrl(prev => [
					...prev,
					{ name: file.name, id: imageId, url: URL.createObjectURL(file) }
				]);
			}
		}

		if (fileInputElRef.current !== null) {
			fileInputElRef.current.value = "";
		}
	};

	return (
		<ImageInputContainer container spacing={{ xs: 1, md: 2, lg: 3 }} rowSpacing={{ xs: 2, lg: 3 }}>
			<Grid item xs={4} sm={3} md={4} xl={3}>
				<InputContainer>
					<InputLabel htmlFor="imageInput">
						<AddBoxIcon />
					</InputLabel>
					<input
						type="file"
						id="imageInput"
						accept="image/*"
						multiple
						hidden
						onInput={addImageHandler}
						ref={fileInputElRef}
					/>
				</InputContainer>
			</Grid>
			{imagesUrl.map(img => (
				<Grid item xs={4} sm={3} md={4} xl={3} key={img.id}>
					<ImageContainer imgSrc={img.url}>
						<DeleteButton
							onClick={() => {
								removeImageHandler(img.id);
							}}
						>
							<CloseIcon />
						</DeleteButton>
					</ImageContainer>
				</Grid>
			))}
		</ImageInputContainer>
	);
};

export default ImageInput;
