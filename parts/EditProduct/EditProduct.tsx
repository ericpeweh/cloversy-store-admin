// Dependencies
import React, { useState, useEffect, useMemo } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Head from "next/head";

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

// Types
import { Brand, Category, Product, SetFieldValue } from "../../interfaces";

// Utils
import compressImage from "../../utils/compressImage";
import { shoesSizes } from "../../utils/helperData";

// Hooks
import useImageInput from "../../hooks/useImageInput";
import useSelector from "../../hooks/useSelector";
import { useGetCategoriesQuery } from "../../api/category.api";
import { useGetBrandsQuery } from "../../api/brand.api";
import { useRouter } from "next/router";
import { useGetProductDetailQuery, useUpdateProductMutation } from "../../api/product.api";

// Components
import {
	Alert,
	Chip,
	CircularProgress,
	Divider,
	Grid,
	ListItem,
	Stack,
	Typography
} from "@mui/material";
import Button from "../../components/Button/Button";
import PageTitle from "../../components/PageTitle/PageTitle";
import TextInput from "../../components/TextInput/TextInput";
import SelectInput from "../../components/SelectInput/SelectInput";
import BoxButton from "../../components/BoxButton/BoxButton";
import ImageInput from "../../components/ImageInput/ImageInput";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import FallbackContainer from "../../components/FallbackContainer/FallbackContainer";

interface UpdateProductFormValues {
	title: string;
	sku: string;
	price: number;
	status: "active" | "disabled";
	category_id: number;
	brand_id: number;
	description: string;
	slug: string;
	tags: string[];
	sizes: string[];
	removedTags: string[];
	removedSizes: string[];
	removedImages: string[];
}

const UpdateProductSchema = Yup.object().shape({
	title: Yup.string().required("Required"),
	sku: Yup.string().max(50).required("Required"),
	slug: Yup.string().required("Required"),
	price: Yup.number().min(0).required("Required"),
	status: Yup.string().equals(["active", "disabled"]).required("Required"),
	category_id: Yup.number().not([-1], "Please select a category").required("Required"),
	brand_id: Yup.number().not([-1], "Please select a brand").required("Required"),
	description: Yup.string(),
	tags: Yup.array().of(Yup.string()).min(1, "Please add at least 1 tag"),
	sizes: Yup.array().of(Yup.string()).min(1, "Please select at least 1 size")
});

const EditProduct = () => {
	const router = useRouter();
	const { productId } = router.query;
	const isAuth = useSelector(state => state.auth.isAuth);
	const [tagInput, setTagInput] = useState("");
	const { images, imagesUrl, setImages, setImagesUrl } = useImageInput();
	const [originalProductData, setOriginalProductData] = useState<Product>();

	const [formInitialValues, setFormInitialValues] = useState<UpdateProductFormValues>({
		title: "",
		sku: "",
		price: 0,
		status: "active",
		category_id: -1,
		brand_id: -1,
		description: "",
		slug: "",
		tags: [],
		sizes: [],
		removedTags: [],
		removedSizes: [],
		removedImages: []
	});

	const {
		data: getProductData,
		isLoading: isGetProductLoading,
		isSuccess: isGetProductSuccess,
		error: getProductErrorData,
		refetch: refetchProduct
	} = useGetProductDetailQuery(productId, {
		skip: !isAuth || !productId
	});
	const getProductError: any = getProductErrorData;
	const productData = getProductData?.data.product;

	// Set form initial values
	// Save original selectedUsers data to state
	useEffect(() => {
		if (isGetProductSuccess && productData) {
			setFormInitialValues({
				title: productData.title ?? "",
				sku: productData.sku ?? "",
				price: productData.price ?? 0,
				status: productData.status ?? "",
				category_id: productData.category_id ?? -1,
				brand_id: productData.brand_id ?? -1,
				description: productData.description ?? "",
				slug: productData.slug ?? "",
				tags: productData.tags ?? [],
				sizes: productData.sizes ?? [],
				removedTags: [],
				removedSizes: [],
				removedImages: []
			});

			setImagesUrl(
				productData.images.map(url => ({
					name: url,
					id: url,
					url
				}))
			);

			setOriginalProductData(productData);
		}
	}, [productData, isGetProductSuccess, setImagesUrl]);

	const {
		data: categoryData,
		isFetching: isGetCategoriesLoading,
		refetch: refetchCategories
	} = useGetCategoriesQuery(
		{ q: "", page: "", sortBy: "" },
		{
			skip: !isAuth
		}
	);

	const categoryOptions = useMemo<{ label: string; value: number }[]>(() => {
		const availableOptions =
			categoryData?.data.categories?.map((category: Category) => ({
				label: category.name,
				value: category.id
			})) || [];

		return [{ label: "Select category", value: -1 }, ...availableOptions];
	}, [categoryData?.data.categories]);

	const {
		data: brandData,
		isFetching: isGetBrandsLoading,
		refetch: refetchBrands
	} = useGetBrandsQuery(
		{ q: "", page: "", sortBy: "" },
		{
			skip: !isAuth
		}
	);

	const brandOptions = useMemo<{ label: string; value: number }[]>(() => {
		const availableOptions =
			brandData?.data.brands?.map((brand: Brand) => ({
				label: brand.name,
				value: brand.id
			})) || [];

		return [{ label: "Select brand", value: -1 }, ...availableOptions];
	}, [brandData?.data.brands]);

	const [
		updateProduct,
		{
			data: updateProductData,
			isLoading: isupdateProductLoading,
			error: updateProductErrorData,
			isSuccess: isUpdateProductSuccess,
			reset: resetUpdateProduct
		}
	] = useUpdateProductMutation();
	const updateProductError: any = updateProductErrorData;
	const updatedProductId = updateProductData?.data.updatedProduct.id;

	useEffect(() => {
		if (isUpdateProductSuccess) {
			resetUpdateProduct();
			router.push(`/products/${updatedProductId}`);
		}
	}, [isUpdateProductSuccess, resetUpdateProduct, router, updatedProductId]);

	const toggleSizeHandler = (
		clickedSize: string,
		values: UpdateProductFormValues,
		setFieldValue: SetFieldValue
	) => {
		if (values.sizes.indexOf(clickedSize) > -1) {
			// Remove size
			if (originalProductData?.sizes.includes(clickedSize)) {
				setFieldValue("removedSizes", [...values.removedSizes, clickedSize]);
			}

			setFieldValue(
				"sizes",
				values.sizes.filter((size: string) => size !== clickedSize)
			);
		} else {
			// Add new size
			if (originalProductData?.sizes.includes(clickedSize)) {
				setFieldValue(
					"removedSizes",
					values.removedSizes.filter((size: string) => size !== clickedSize)
				);
			}

			setFieldValue("sizes", [...values.sizes, clickedSize]);
		}
	};

	const addTagHandler = (values: UpdateProductFormValues, setFieldValue: SetFieldValue) => {
		// Do nothing when input is empty
		if (!tagInput) return;

		// Check is tag already exist
		const exist = values.tags
			.map((tag: string) => tag.toLowerCase())
			.includes(tagInput.toLowerCase());
		if (exist) {
			setTagInput("");
			return;
		}

		setFieldValue("tags", [...values.tags, tagInput]);
		setTagInput("");
	};

	const removeTagHandler = (
		values: UpdateProductFormValues,
		setFieldValue: SetFieldValue,
		selectedTag: string
	) => {
		if (originalProductData?.tags.includes(selectedTag)) {
			setFieldValue("removedTags", [...values.removedTags, selectedTag]);
		}

		setFieldValue(
			"tags",
			values.tags.filter(current => current !== selectedTag)
		);
	};

	const updateProductHandler = async (values: UpdateProductFormValues) => {
		const { sizes, tags, ...data } = values;

		const filteredSizes = sizes.filter(size => !originalProductData?.sizes.includes(size));
		const filteredTags = tags.filter(tag => !originalProductData?.tags.includes(tag));

		const updatedProductData = new FormData();

		updatedProductData.append("sizes", filteredSizes.join(","));
		updatedProductData.append("tags", filteredTags.join(","));

		for (const [key, value] of Object.entries(data)) {
			updatedProductData.append(key, value + "");
		}

		for (const image of images) {
			await compressImage(image.file).then((result: File) =>
				updatedProductData.append("images", result)
			);
		}

		if (productData) {
			updateProduct({ updatedProductData, productId: productData?.id });
		}
	};

	return (
		<>
			<Head>
				<title>Edit Product | {productData?.title || "Loading..."}</title>
			</Head>
			<EditProductContainer>
				<Formik
					initialValues={formInitialValues}
					validationSchema={UpdateProductSchema}
					onSubmit={values => updateProductHandler(values)}
					enableReinitialize={true}
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
						setFieldValue,
						setTouched
					}) => (
						<>
							<Stack direction="row" alignItems="center" justifyContent="space-between">
								<PageTitle sx={{ mb: 0 }}>Edit Product</PageTitle>
								<Stack direction="row" alignItems="center" gap={1}>
									<Button
										size="small"
										color="secondary"
										variant="outlined"
										onClick={() => router.back()}
									>
										Cancel
									</Button>
									<Button
										startIcon={<DoneIcon />}
										size="small"
										color="primary"
										onClick={() => handleSubmit()}
										loading={isupdateProductLoading}
									>
										Update Product
									</Button>
								</Stack>
							</Stack>
							{updateProductError && (
								<Alert severity="error">{updateProductError.data.message}</Alert>
							)}
							{!isGetProductLoading && getProductError && (
								<FallbackContainer>
									<Alert severity="error">{getProductError.data.message}</Alert>
									<BoxButton onClick={refetchProduct}>Try again</BoxButton>
								</FallbackContainer>
							)}
							{isGetProductLoading && (
								<FallbackContainer>
									<CircularProgress />
								</FallbackContainer>
							)}
							{!isGetProductLoading && getProductData && (
								<FormContainer>
									<Grid container spacing={{ xs: 1, sm: 3, lg: 4, xl: 5 }} alignItems="flex-start">
										<Grid item xs={12} md={6}>
											<Grid container spacing={{ xs: 2, md: 3 }} sx={{ ml: { xs: -2 } }}>
												<Grid item xs={12}>
													<TextInput
														name="title"
														label="Product title"
														value={values.title}
														onChange={handleChange}
														onBlur={handleBlur}
														error={Boolean(errors.title && touched.title)}
													/>
													{errors.title && touched.title && (
														<ErrorMessage>{errors.title}</ErrorMessage>
													)}
												</Grid>

												<Grid item xs={12} sm={6}>
													<TextInput
														name="sku"
														label="SKU Code"
														value={values.sku}
														onChange={handleChange}
														onBlur={handleBlur}
														error={Boolean(errors.sku && touched.sku)}
													/>
													{errors.sku && touched.sku && <ErrorMessage>{errors.sku}</ErrorMessage>}
												</Grid>
												<Grid item xs={12} sm={6}>
													<TextInput
														name="price"
														type="number"
														label="Price"
														value={values.price}
														onChange={handleChange}
														onBlur={handleBlur}
														error={Boolean(errors.price && touched.price)}
													/>
													{errors.price && touched.price && (
														<ErrorMessage>{errors.price}</ErrorMessage>
													)}
												</Grid>
												<Grid item xs={12}>
													<SelectInput
														name="status"
														options={[
															{ label: "Active", value: "active" },
															{ label: "Disabled", value: "disabled" }
														]}
														value={values.status}
														onChange={handleChange}
														onBlur={handleBlur}
														error={Boolean(errors.status && touched.status)}
													/>
													{errors.status && touched.status && (
														<ErrorMessage>{errors.status}</ErrorMessage>
													)}
												</Grid>

												<Grid item xs={12}>
													<Stack direction="row" gap={{ xs: 1, md: 2, lg: 3 }}>
														<SelectInput
															name="category_id"
															options={
																isGetCategoriesLoading
																	? [{ label: "Loading...", value: values.category_id }]
																	: categoryOptions
															}
															value={values.category_id}
															onChange={handleChange}
															onBlur={handleBlur}
															error={Boolean(errors.category_id && touched.category_id)}
														/>
														<BoxButton onClick={refetchCategories}>
															<RefreshIcon />
														</BoxButton>
													</Stack>
													{errors.category_id && touched.category_id && (
														<ErrorMessage>{errors.category_id}</ErrorMessage>
													)}
												</Grid>
												<Grid item xs={12}>
													<Divider flexItem />
												</Grid>
												<Grid item xs={12}>
													<Stack direction="row" gap={{ xs: 1, md: 2, lg: 3 }}>
														<SelectInput
															name="brand_id"
															options={
																isGetBrandsLoading
																	? [{ label: "Loading...", value: values.brand_id }]
																	: brandOptions
															}
															value={values.brand_id}
															onChange={handleChange}
															onBlur={handleBlur}
															error={Boolean(errors.brand_id && touched.brand_id)}
														/>
														<BoxButton onClick={refetchBrands}>
															<RefreshIcon />
														</BoxButton>
													</Stack>
													{errors.brand_id && touched.brand_id && (
														<ErrorMessage>{errors.brand_id}</ErrorMessage>
													)}
												</Grid>
												<Grid item xs={12} sx={{ mt: 2 }}>
													<InputTitle>Product Sizes</InputTitle>
													{errors.sizes && touched.sizes && (
														<ErrorMessage>{errors.sizes}</ErrorMessage>
													)}
													<Grid container item spacing={{ xs: 1, md: 2 }}>
														{shoesSizes.map(size => (
															<Grid item xs={3} sm={3} md={2} lg={2.4} xl={2} key={size}>
																<Button
																	color="primary"
																	size="small"
																	name="sizes"
																	fullWidth
																	onClick={() => {
																		toggleSizeHandler(size, values, setFieldValue);
																		setTouched({ ...touched, sizes: true }, true);
																	}}
																	variant={
																		values.sizes.find((item: string) => item === size)
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
													<TextInput
														name="slug"
														label="Product slug"
														value={values.slug}
														onChange={handleChange}
														onBlur={handleBlur}
														error={Boolean(errors.slug && touched.slug)}
													/>
													{errors.slug && touched.slug && (
														<ErrorMessage>{errors.slug}</ErrorMessage>
													)}
												</Grid>{" "}
												<Grid item xs={12}>
													<TextInput
														name="tags"
														label="Tags"
														placeholder="Enter tag"
														value={tagInput}
														onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
															setTagInput(e.target.value)
														}
														onBlur={() => addTagHandler(values, setFieldValue)}
														error={Boolean(errors.tags && touched.tags)}
														onKeyDown={(e: React.KeyboardEvent) => {
															if (e.key === "Enter") {
																addTagHandler(values, setFieldValue);
															}
														}}
													/>
													{errors.tags && touched.tags && (
														<ErrorMessage>{errors.tags}</ErrorMessage>
													)}
													{values.tags.length === 0 && (
														<FallbackContainer size="small">
															<Typography>No tag added</Typography>
														</FallbackContainer>
													)}
													<TagsContainer>
														{values.tags.map(tag => {
															return (
																<ListItem key={tag}>
																	<Chip
																		label={tag}
																		onDelete={() => removeTagHandler(values, setFieldValue, tag)}
																	/>
																</ListItem>
															);
														})}
													</TagsContainer>
												</Grid>
												<Grid item xs={12}>
													<TextInput
														name="description"
														label="Description"
														multiline
														rows={10}
														value={values.description}
														onChange={handleChange}
														onBlur={handleBlur}
													/>
												</Grid>
												<Grid item xs={12} sx={{ mt: 2 }}>
													<InputTitle>Product Images</InputTitle>
													<ImageInput
														images={images}
														imagesUrl={imagesUrl}
														setImages={setImages}
														setImagesUrl={setImagesUrl}
														setFieldValue={setFieldValue}
														originalImagesData={originalProductData?.images || []}
														removedImages={values.removedImages}
													/>
												</Grid>
											</Grid>
										</Grid>
									</Grid>
								</FormContainer>
							)}
						</>
					)}
				</Formik>
			</EditProductContainer>
		</>
	);
};

export default EditProduct;
