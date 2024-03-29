// Dependencies
import React, { useState } from "react";
import { useRouter } from "next/router";
import { green, orange } from "@mui/material/colors";

// Styles
import {
	ContentContainer,
	DetailDescription,
	DetailItem,
	DetailsContainer,
	DetailTitle,
	ProductDetailsContainer,
	ReviewsContainer,
	ReviewsPagination,
	ReviewsTitle
} from "./ProductDetails.styles";

// Utils
import { formatDateFull } from "../../utils/formatDate";
import formatToRupiah from "../../utils/formatToRupiah";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Hooks
import useSelector from "../../hooks/useSelector";
import { useGetProductDetailQuery } from "../../api/product.api";
import usePagination from "../../hooks/usePagination";

// Components
import {
	Alert,
	Chip,
	CircularProgress,
	Divider,
	Grid,
	Rating,
	Stack,
	Typography
} from "@mui/material";
import PageTitle from "../../components/PageTitle/PageTitle";
import Button from "../../components/Button/Button";
import CarouselWithThumb from "../../components/CarouselWithThumb/CarouselWithThumb";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import ReviewItem from "../../components/ReviewItem/ReviewItem";
import AreaChart from "../../components/AreaChart/AreaChart";
import Head from "next/head";
import FallbackContainer from "../../components/FallbackContainer/FallbackContainer";
import BoxButton from "../../components/BoxButton/BoxButton";
import ImageViewer from "../../components/ImageViewer/ImageViewer";

const ProductDetails = () => {
	const router = useRouter();
	const { productId } = router.query;
	const isAuth = useSelector(state => state.auth.isAuth);
	const [salesAnalyticYear, setSalesAnalyticYear] = useState(() =>
		new Date().getFullYear().toString()
	);
	const [visitorAnalyticYear, setVisitorAnalyticYear] = useState(() =>
		new Date().getFullYear().toString()
	);

	// Image lightbox
	const [isLightboxOpen, setIsLightboxOpen] = useState(false);
	const [lightboxIndex, setLightboxIndex] = useState(0);

	const {
		data: getProductData,
		isLoading: isGetProductLoading,
		isSuccess: isGetProductSuccess,
		error: getProductError,
		refetch: refetchProduct
	} = useGetProductDetailQuery(
		{ productId, salesAnalyticYear, visitorAnalyticYear },
		{
			skip: !isAuth || !productId
		}
	);
	const productError: any = getProductError;
	const productData = getProductData?.data.product;

	// Reviews pagination
	const { page: reviewPage, onChange: reviewPaginationChangeHandler } = usePagination();

	return (
		<>
			<Head>
				<title>Product Details | {productData?.title || "Loading..."}</title>
			</Head>
			<ProductDetailsContainer>
				<ImageViewer
					isOpen={isLightboxOpen}
					onClose={() => setIsLightboxOpen(false)}
					imageIndex={lightboxIndex}
					slides={
						productData?.images?.length !== 0
							? productData?.images.map(url => ({ src: url }))
							: [{ src: "/images/no-image.png" }]
					}
				/>
				<Stack direction="row" alignItems="center" justifyContent="space-between">
					<PageTitle sx={{ mb: 0 }}>Product Details</PageTitle>
					<Stack direction="row" alignItems="center" gap={1}>
						<Button
							startIcon={<ArrowBackIcon />}
							size="small"
							color="secondary"
							onClick={() => router.push("/products")}
						>
							Go Back
						</Button>
						<Button
							startIcon={<EditIcon />}
							size="small"
							color="secondary"
							variant="outlined"
							onClick={() => router.push(`/products/${productData?.id}/edit`)}
						>
							Edit Product
						</Button>
					</Stack>
				</Stack>
				{!isGetProductLoading && getProductError && (
					<FallbackContainer>
						<Alert severity="error">
							{productError?.data?.message || "Error occured while fetching product."}
						</Alert>
						<BoxButton onClick={refetchProduct}>Try again</BoxButton>
					</FallbackContainer>
				)}
				{isGetProductLoading && (
					<FallbackContainer>
						<CircularProgress />
					</FallbackContainer>
				)}

				{isGetProductSuccess && productData && (
					<>
						<ContentContainer>
							<Grid container spacing={{ xs: 1, sm: 2, md: 3 }} alignItems="flex-start">
								<Grid item xs={12} lg={5} xl={4}>
									<CarouselWithThumb
										images={
											productData?.images && productData?.images?.length !== 0
												? productData.images
												: ["/images/no-image.png"]
										}
										size="small"
										sx={{
											"@media screen and (max-width: 1200px)": {
												width: "50%",
												margin: "0rem auto 1rem"
											},
											"@media screen and (max-width: 900px)": {
												width: "70%"
											},
											"@media screen and (max-width: 600px)": {
												width: "100%"
											}
										}}
										onImageClick={(imageIndex: number) => {
											setLightboxIndex(imageIndex);
											setIsLightboxOpen(true);
										}}
									/>
									<DetailsContainer>
										<Divider flexItem sx={{ mt: 2, mb: 1 }} />
										<DetailItem>
											<DetailTitle>Created</DetailTitle>
											<DetailDescription>
												{formatDateFull(productData.created_at)}
											</DetailDescription>
										</DetailItem>
										<DetailItem>
											<DetailTitle>Modified</DetailTitle>
											<DetailDescription>
												{formatDateFull(productData.modified_at)}
											</DetailDescription>
										</DetailItem>
									</DetailsContainer>
								</Grid>
								<Grid item xs={12} lg={7} xl={8}>
									<DetailsContainer>
										<DetailItem>
											<DetailTitle>Product Title</DetailTitle>
											<DetailDescription>{productData.title}</DetailDescription>
										</DetailItem>
										<DetailItem>
											<DetailTitle>SKU Code</DetailTitle>
											<DetailDescription>{productData.sku}</DetailDescription>
										</DetailItem>
										<DetailItem>
											<DetailTitle>Price</DetailTitle>
											<DetailDescription>{formatToRupiah(productData.price)}</DetailDescription>
										</DetailItem>
										<DetailItem>
											<DetailTitle>Status</DetailTitle>
											<DetailDescription>
												<Stack justifyContent="flex-end">
													<StatusBadge
														color={productData.status === "active" ? "primary" : "error"}
													>
														{productData.status}
													</StatusBadge>
												</Stack>
											</DetailDescription>
										</DetailItem>
										<DetailItem>
											<DetailTitle>Rating</DetailTitle>
											<DetailDescription>
												<Stack direction="row" alignItems="center" gap="1rem">
													{productData?.rating ? (
														<>
															<Rating value={+productData.rating} readOnly precision={0.1} />
															<DetailDescription>
																{(+productData?.rating).toFixed(1)} | {productData.review_count}{" "}
																Review{+productData?.review_count > 1 && "s"}
															</DetailDescription>
														</>
													) : (
														<DetailDescription>- No reviews yet -</DetailDescription>
													)}
												</Stack>
											</DetailDescription>
										</DetailItem>
										<DetailItem>
											<DetailTitle>Category</DetailTitle>
											<DetailDescription>{productData.category}</DetailDescription>
										</DetailItem>
										<DetailItem>
											<DetailTitle>Brand</DetailTitle>
											<DetailDescription>{productData.brand}</DetailDescription>
										</DetailItem>
										<DetailItem>
											<DetailTitle>Sizes</DetailTitle>
											<DetailDescription>
												<Grid container spacing={1}>
													{productData.sizes.map(size => (
														<Grid item key={size} xs={3} sm={2} md={1.5} lg={3} xl={1.5}>
															<StatusBadge key={size} color="secondary" centerText>
																{size}
															</StatusBadge>
														</Grid>
													))}
												</Grid>
											</DetailDescription>
										</DetailItem>
										<DetailItem>
											<DetailTitle>Tags</DetailTitle>
											<DetailDescription>
												<Stack flexWrap="wrap" direction="row" gap={1}>
													{productData.tags.map(tag => (
														<Chip
															sx={{
																borderRadius: "0.5rem",
																fontSize: { xs: "1.4rem", sm: "1.5rem", md: "1.6rem" },
																height: { xs: "2.5rem", sm: "3.5rem" }
															}}
															label={tag}
															key={tag}
														/>
													))}
												</Stack>
											</DetailDescription>
										</DetailItem>
									</DetailsContainer>
								</Grid>
								<Grid item xs={12}>
									<DetailItem sx={{ flexDirection: "column" }}>
										<DetailTitle>Description :</DetailTitle>
										<DetailDescription sx={{ mt: 2 }}>
											{productData.description || (
												<FallbackContainer size="small">
													{"No description provided."}
												</FallbackContainer>
											)}
										</DetailDescription>
									</DetailItem>
								</Grid>
							</Grid>
						</ContentContainer>

						<ContentContainer>
							<ReviewsTitle>Product Reviews ({productData?.review_count || "0"})</ReviewsTitle>
							{productData?.reviews?.length === 0 && (
								<FallbackContainer>
									<Typography textAlign="center">- No reviews yet -</Typography>
								</FallbackContainer>
							)}
							{productData && productData?.reviews?.length !== 0 && (
								<Grid container sx={{ mt: { xs: 1, sm: 2 } }}>
									<Grid item xs={12}>
										<ReviewsContainer container spacing={{ xs: 1, md: 2 }}>
											{productData.reviews
												.slice((reviewPage - 1) * 4, (reviewPage - 1) * 4 + 4)
												.map(review => (
													<Grid item xs={12} xl={6} key={review.id}>
														<ReviewItem reviewData={review} />
													</Grid>
												))}
										</ReviewsContainer>
										{Math.ceil(productData.reviews.length / 4) > 1 && (
											<ReviewsPagination
												page={reviewPage}
												onChange={reviewPaginationChangeHandler}
												count={Math.ceil(productData.reviews.length / 4)}
												shape="rounded"
												color="primary"
											/>
										)}
									</Grid>
								</Grid>
							)}
						</ContentContainer>
					</>
				)}
				{productData && productData.analytics && (
					<ContentContainer>
						<ReviewsTitle>Statistik Produk</ReviewsTitle>
						<Grid container>
							<Grid item xs={12} xl={6}>
								<AreaChart
									title="Produk Terjual"
									data={productData.analytics.map(record => ({
										name: record.month,
										sales: record.product_sales
									}))}
									dataKey="sales"
									fillColor={green[100]}
									strokeColor={green[200]}
									yearFilter={salesAnalyticYear}
									onYearFilterChange={e => {
										setSalesAnalyticYear(e.target.value as string);
									}}
									allowDecimal={false}
								/>
							</Grid>
							<Grid item xs={12} xl={6}>
								<AreaChart
									title="Pengunjung (Halaman Produk)"
									data={productData.analytics.map(record => ({
										name: record.month,
										visitors: record.page_views
									}))}
									dataKey="visitors"
									fillColor={orange[100]}
									strokeColor={orange[200]}
									yearFilter={visitorAnalyticYear}
									onYearFilterChange={e => {
										setVisitorAnalyticYear(e.target.value as string);
									}}
									allowDecimal={false}
								/>
							</Grid>
						</Grid>
					</ContentContainer>
				)}
			</ProductDetailsContainer>
		</>
	);
};

export default ProductDetails;
