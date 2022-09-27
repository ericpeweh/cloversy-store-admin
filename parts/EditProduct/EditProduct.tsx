// Dependencies
import React, { useState } from "react";

// Styles
import {
	EditProductContainer,
	FormContainer,
	InputTitle,
	TagsContainer
} from "./EditProduct.styles";

// Icons
import DoneIcon from "@mui/icons-material/Done";
import RefreshIcon from "@mui/icons-material/Refresh";

// Hooks
import useImageInput from "../../hooks/useImageInput";

// Components
import { Chip, Divider, Grid, ListItem, Stack } from "@mui/material";
import Button from "../../components/Button/Button";
import PageTitle from "../../components/PageTitle/PageTitle";
import TextInput from "../../components/TextInput/TextInput";
import SelectInput from "../../components/SelectInput/SelectInput";
import BoxButton from "../../components/BoxButton/BoxButton";
import ImageInput from "../../components/ImageInput/ImageInput";

interface TagData {
	key: number;
	label: string;
}

const sizes = [
	36, 36.5, 37.5, 38, 38.5, 39, 40, 40.5, 41, 42, 42.5, 43, 44, 44.5, 45, 45.5, 46, 47, 47.5
];

const EditProduct = () => {
	const [selectedSize, setSelectedSize] = useState([36, 38, 39, 40, 40.5]);
	const [tagsData, setTagsData] = useState<readonly TagData[]>([
		{ key: 0, label: "cartoon" },
		{ key: 1, label: "aesthetic" },
		{ key: 2, label: "anime" },
		{ key: 3, label: "abstract" },
		{ key: 4, label: "sunset" }
	]);
	const { images, imagesUrl, setImages, setImagesUrl } = useImageInput();

	const removeTagHandler = (tagToDelete: TagData) => {
		setTagsData(tags => tags.filter(tag => tag.key !== tagToDelete.key));
	};

	const toggleSizeHandler = (clickedSize: number) => {
		if (selectedSize.indexOf(clickedSize) > -1) {
			setSelectedSize(prevSizes => prevSizes.filter((size: number) => size !== clickedSize));
		} else {
			setSelectedSize(prevSizes => [...prevSizes, clickedSize]);
		}
	};

	return (
		<EditProductContainer>
			<Stack direction="row" alignItems="center" justifyContent="space-between">
				<PageTitle sx={{ mb: 0 }}>Edit Product</PageTitle>
				<Stack direction="row" alignItems="center" gap={1}>
					<Button size="small" color="secondary" variant="outlined">
						Discard
					</Button>
					<Button startIcon={<DoneIcon />} size="small" color="primary">
						Update Product
					</Button>
				</Stack>
			</Stack>
			<FormContainer>
				<Grid container spacing={{ xs: 1, sm: 3, lg: 4, xl: 5 }} alignItems="flex-start">
					<Grid item xs={12} md={6}>
						<Grid container spacing={{ xs: 2, md: 3 }} sx={{ ml: { xs: -2 } }}>
							<Grid item xs={12}>
								<TextInput id="title" label="Product title" />
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextInput id="sku" label="SKU Code" />
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextInput id="price" label="Price" />
							</Grid>
							<Grid item xs={12}>
								<SelectInput options={["Status", "Active", "Disabled"]} value={"Status"} />
							</Grid>
							<Grid item xs={12}>
								<Stack direction="row" gap={{ xs: 1, md: 2, lg: 3 }}>
									<SelectInput
										options={[
											"Categories",
											"Sneaker",
											"Slip-On",
											"Sandal",
											"Bags",
											"Wallet",
											"Jacket"
										]}
										value={"Categories"}
									/>
									<BoxButton>
										<RefreshIcon />
									</BoxButton>
								</Stack>
							</Grid>
							<Grid item xs={12}>
								<Divider flexItem />
							</Grid>
							<Grid item xs={12}>
								<Stack direction="row" gap={{ xs: 1, md: 2, lg: 3 }}>
									<SelectInput
										options={[
											"All Brands",
											"Nike",
											"Adidas",
											"Ventela",
											"Patrobas",
											"NAH Project",
											"Lainnya"
										]}
										value={"All Brands"}
									/>
									<BoxButton>
										<RefreshIcon />
									</BoxButton>
								</Stack>
							</Grid>
							<Grid item xs={12} sx={{ mt: 2 }}>
								<InputTitle>Product Sizes</InputTitle>
								<Grid container item spacing={{ xs: 1, md: 2 }}>
									{sizes.map(size => (
										<Grid item xs={3} sm={3} md={2} lg={2.4} xl={2} key={size}>
											<Button
												color="primary"
												size="small"
												fullWidth
												onClick={() => toggleSizeHandler(size)}
												variant={
													selectedSize.find((item: number) => item === size)
														? "contained"
														: "outlined"
												}
											>
												{size}
											</Button>
										</Grid>
									))}
								</Grid>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12} md={6} sx={{ mt: { xs: 2, sm: 0 } }}>
						<Grid container item spacing={{ xs: 2, md: 3 }}>
							<Grid item xs={12}>
								<TextInput id="tags" label="Tags" placeholder="Enter tag" />
								<TagsContainer>
									{tagsData.map(data => {
										return (
											<ListItem key={data.key}>
												<Chip label={data.label} onDelete={() => removeTagHandler(data)} />
											</ListItem>
										);
									})}
								</TagsContainer>
							</Grid>
							<Grid item xs={12}>
								<TextInput id="description" label="Description" multiline rows={10} />
							</Grid>
							<Grid item xs={12} sx={{ mt: 2 }}>
								<InputTitle>Product Images</InputTitle>
								<ImageInput
									images={images}
									imagesUrl={imagesUrl}
									setImages={setImages}
									setImagesUrl={setImagesUrl}
								/>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</FormContainer>
		</EditProductContainer>
	);
};

export default EditProduct;
