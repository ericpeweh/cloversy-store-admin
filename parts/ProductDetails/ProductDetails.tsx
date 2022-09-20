// Dependencies
import React from "react";
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

// Icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

// Hooks
import useModal from "../../hooks/useModal";

// Components
import { Chip, Divider, Grid, Stack } from "@mui/material";
import PageTitle from "../../components/PageTitle/PageTitle";
import Button from "../../components/Button/Button";
import CarouselWithThumb from "../../components/CarouselWithThumb/CarouselWithThumb";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import ReviewItem from "../../components/ReviewItem/ReviewItem";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import AreaChart from "../../components/AreaChart/AreaChart";

// Chart data

// Chart data
const data = [
	{
		name: "Jan",
		sales: 15,
		visitors: 200
	},
	{
		name: "Feb",
		sales: 30,
		visitors: 180
	},
	{
		name: "Mar",
		sales: 4,
		visitors: 100
	},
	{
		name: "Apr",
		sales: 4,
		visitors: 50
	},
	{
		name: "May",
		sales: 40,
		visitors: 198
	},
	{
		name: "Jun",
		sales: 8,
		visitors: 309
	},
	{
		name: "Jul",
		sales: 15,
		visitors: 254
	},
	{
		name: "Aug",
		sales: 15,
		visitors: 85
	},
	{
		name: "Sep",
		sales: 15,
		visitors: 93
	},
	{
		name: "Okt",
		sales: 4,
		visitors: 152
	},
	{
		name: "Nov",
		sales: 15,
		visitors: 303
	},
	{
		name: "Dec",
		sales: 32,
		visitors: 142
	}
];

const sizes = [
	36, 36.5, 37.5, 38, 38.5, 39, 40, 40.5, 41, 42, 42.5, 43, 44, 44.5, 45, 45.5, 46, 47, 47.5
];

const ProductDetails = () => {
	const router = useRouter();

	const {
		isOpen: isDeleteProductModalOpen,
		openHandler: openDeleteProductModalHandler,
		closeHandler: closeDeleteProductModalHandler
	} = useModal();

	return (
		<ProductDetailsContainer>
			<ConfirmationModal
				modalTitle="Delete product"
				modalDescription="Are you sure you want to delete <product name>, this action can't be undone."
				onClose={closeDeleteProductModalHandler}
				open={isDeleteProductModalOpen}
				confirmText="Delete"
				confirmColor="error"
				cancelText="Cancel"
				cancelColor="secondary"
			/>
			<Stack direction="row" alignItems="center" justifyContent="space-between">
				<PageTitle sx={{ mb: 0 }}>Product Details</PageTitle>
				<Stack direction="row" alignItems="center" gap={1}>
					<Button
						startIcon={<EditIcon />}
						size="small"
						color="secondary"
						variant="outlined"
						onClick={() => router.push("/products/abc/edit")}
					>
						Edit Product
					</Button>
					<Button
						startIcon={<DeleteIcon />}
						size="small"
						color="error"
						onClick={openDeleteProductModalHandler}
					>
						Delete
					</Button>
				</Stack>
			</Stack>
			<ContentContainer>
				<Grid container spacing={{ xs: 1, sm: 2, md: 3 }} alignItems="flex-start">
					<Grid item xs={12} lg={5} xl={4}>
						<CarouselWithThumb
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
						/>
						<DetailsContainer>
							<Divider flexItem sx={{ mt: 2, mb: 1 }} />
							<DetailItem>
								<DetailTitle>Created</DetailTitle>
								<DetailDescription>Senin, 2 Juli 2022 | 14:18 WIB</DetailDescription>
							</DetailItem>
							<DetailItem>
								<DetailTitle>Modified</DetailTitle>
								<DetailDescription>Senin, 2 Juli 2022 | 15:12 WIB</DetailDescription>
							</DetailItem>
						</DetailsContainer>
					</Grid>
					<Grid item xs={12} lg={7} xl={8}>
						<DetailsContainer>
							<DetailItem>
								<DetailTitle>Product Title</DetailTitle>
								<DetailDescription>Nike AF1 Homesick - Special Edition</DetailDescription>
							</DetailItem>
							<DetailItem>
								<DetailTitle>SKU Code</DetailTitle>
								<DetailDescription>NIKE 134 05 40 22</DetailDescription>
							</DetailItem>
							<DetailItem>
								<DetailTitle>Price</DetailTitle>
								<DetailDescription>Rp 3.799.000</DetailDescription>
							</DetailItem>
							<DetailItem>
								<DetailTitle>Status</DetailTitle>
								<DetailDescription>
									<Stack justifyContent="flex-end">
										<StatusBadge>Active</StatusBadge>
									</Stack>
								</DetailDescription>
							</DetailItem>
							<DetailItem>
								<DetailTitle>Category</DetailTitle>
								<DetailDescription>Sneaker</DetailDescription>
							</DetailItem>
							<DetailItem>
								<DetailTitle>Brand</DetailTitle>
								<DetailDescription>Nike</DetailDescription>
							</DetailItem>
							<DetailItem>
								<DetailTitle>Sizes</DetailTitle>
								<DetailDescription>
									<Grid container spacing={1}>
										{sizes.map(size => (
											<Grid item key={size} xs={3} sm={2} md={1.5} lg={3} xl={1.5}>
												<StatusBadge key={size} color="secondary" centerText>
													{size.toString()}
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
										{["cartoon", "aesthethic", "anime", "life"].map(tag => (
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
							<DetailItem>
								<DetailTitle>Description</DetailTitle>
								<DetailDescription>
									<p>
										Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est, dolores unde.
										Suscipit, omnis maxime. Quos doloremque hic laborum incidunt nostrum, impedit
										nulla ex aperiam ad similique. Quibusdam fuga esse illo!
									</p>
									<br />
									<p>
										Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id nihil blanditiis
										aliquam magnam explicabo temporibus, ducimus quis quidem libero est!
									</p>
								</DetailDescription>
							</DetailItem>
						</DetailsContainer>
					</Grid>
				</Grid>
			</ContentContainer>
			<ContentContainer>
				<ReviewsTitle>Product Reviews</ReviewsTitle>
				<Grid container sx={{ mt: { xs: 1, sm: 2 } }}>
					<Grid item xs={12}>
						<ReviewsContainer container spacing={{ xs: 1, md: 2 }}>
							<ReviewItem />
							<ReviewItem />
							<ReviewItem />
						</ReviewsContainer>
						<ReviewsPagination count={5} shape="rounded" color="primary" />
					</Grid>
				</Grid>
			</ContentContainer>
			<ContentContainer>
				<ReviewsTitle>Statistik Produk</ReviewsTitle>
				<Grid container>
					<Grid item xs={12} xl={6}>
						<AreaChart
							title="Produk Terjual"
							data={data}
							dataKey="sales"
							fillColor={green[100]}
							strokeColor={green[200]}
						/>
					</Grid>
					<Grid item xs={12} xl={6}>
						<AreaChart
							title="Pengunjung (Halaman Produk)"
							data={data}
							dataKey="visitors"
							fillColor={orange[100]}
							strokeColor={orange[200]}
						/>
					</Grid>
				</Grid>
			</ContentContainer>
		</ProductDetailsContainer>
	);
};

export default ProductDetails;
