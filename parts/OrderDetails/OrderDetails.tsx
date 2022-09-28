// Dependencies
import React from "react";
import { useRouter } from "next/router";

// Styles
import {
	Address,
	AddressContainer,
	AddressName,
	AddressNumber,
	ContentContainer,
	ContentHeader,
	DetailDescription,
	DetailItem,
	DetailsContainer,
	DetailTitle,
	InfoContainer,
	InfoDescription,
	InfoTitle,
	OrderCardContainer,
	OrderDate,
	OrderDetailsContainer,
	OrderNumber,
	Section,
	SectionTitle,
	TotalPriceText
} from "./OrderDetails.styles";

// Icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PrintIcon from "@mui/icons-material/Print";

// Hooks
import useModal from "../../hooks/useModal";

// Components
import { Divider, Grid, IconButton, Stack } from "@mui/material";
import PageTitle from "../../components/PageTitle/PageTitle";
import Button from "../../components/Button/Button";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import BoxButton from "../../components/BoxButton/BoxButton";
import SelectInput from "../../components/SelectInput/SelectInput";
import OrderCard from "../../components/OrderCard/OrderCard";
import TextInput from "../../components/TextInput/TextInput";
import Timeline from "../../components/Timeline/Timeline";

const OrderDetails = () => {
	const router = useRouter();

	const {
		isOpen: isDeleteorderModalOpen,
		openHandler: openDeleteorderModalHandler,
		closeHandler: closeDeleteorderModalHandler
	} = useModal();

	return (
		<OrderDetailsContainer>
			<ConfirmationModal
				modalTitle="Delete order"
				modalDescription="Are you sure you want to delete <order name>, this action can't be undone."
				onClose={closeDeleteorderModalHandler}
				open={isDeleteorderModalOpen}
				confirmText="Delete"
				confirmColor="error"
				cancelText="Cancel"
				cancelColor="secondary"
			/>
			<Stack direction="row" alignItems="center" justifyContent="space-between">
				<PageTitle sx={{ mb: 0 }}>Order Detail</PageTitle>
				<Stack direction="row" alignItems="center" gap={1}>
					<Button
						startIcon={<EditIcon />}
						size="small"
						color="secondary"
						variant="outlined"
						onClick={() => router.push("/orders/abc/edit")}
					>
						Edit order
					</Button>
					<Button
						startIcon={<DeleteIcon />}
						size="small"
						color="error"
						onClick={openDeleteorderModalHandler}
					>
						Delete
					</Button>
				</Stack>
			</Stack>
			<ContentHeader>
				<Stack>
					<OrderNumber>
						No Invoice: PROD/21072022/00001
						<IconButton size="small">
							<ContentCopyIcon fontSize="small" />
						</IconButton>
					</OrderNumber>
					<OrderDate>
						<CalendarTodayIcon fontSize="small" />
						21 Juli 2022, 14:40 WIB
					</OrderDate>
				</Stack>
				<Stack
					direction={{ xs: "column", sm: "row" }}
					gap={1}
					sx={{
						height: {
							xs: "auto",
							sm: "4rem"
						},
						width: {
							xs: "100%",
							sm: "auto"
						}
					}}
				>
					<SelectInput
						options={[
							"Change order status",
							"Awaiting payment",
							"Confirmed",
							"On Progress",
							"Shipped",
							"Delivered",
							"Canceled",
							"Pending"
						]}
						value={"Change order status"}
						size="small"
						sx={{ width: { xs: "100%", sm: "25rem" } }}
					/>
					<BoxButton sx={{ mr: { xs: 0, sm: 1 } }}>Save</BoxButton>
					<BoxButton sx={{ backgroundColor: "#555", color: "#fff" }}>
						<PrintIcon />
					</BoxButton>
				</Stack>
			</ContentHeader>
			<Divider />
			<ContentContainer>
				<Grid container spacing={3}>
					<Grid item xs={12} md={6}>
						<DetailsContainer>
							<DetailItem>
								<DetailTitle>Customer</DetailTitle>
								<DetailDescription>Mikici Cimol</DetailDescription>
							</DetailItem>
							<DetailItem>
								<DetailTitle sx={{ mt: 0.5 }}>Email</DetailTitle>
								<Stack direction="row" alignItems="center" gap={1}>
									<DetailDescription>mikicicimol@gmail.com</DetailDescription>
									<IconButton size="small">
										<ContentCopyIcon fontSize="small" />
									</IconButton>
								</Stack>
							</DetailItem>
							<DetailItem>
								<DetailTitle sx={{ mt: 0.5 }}>Contact</DetailTitle>
								<Stack direction="row" alignItems="center" gap={1}>
									<DetailDescription>+62 853 1234 2134</DetailDescription>
									<IconButton size="small">
										<ContentCopyIcon fontSize="small" />
									</IconButton>
								</Stack>
							</DetailItem>
							<DetailItem>
								<DetailTitle>Order status</DetailTitle>
								<DetailDescription>
									<Stack
										justifyContent="flex-start"
										direction={{ xs: "column", sm: "row", md: "column", xl: "row" }}
										gap={1}
									>
										<StatusBadge centerText>Awaiting Payment</StatusBadge>
										<p>| Modified: 21 Juli 2022, 14:40 WIB</p>
									</Stack>
								</DetailDescription>
							</DetailItem>
							<DetailItem>
								<DetailTitle>Payment status</DetailTitle>
								<DetailDescription>
									<Stack
										justifyContent="flex-start"
										direction={{ xs: "column", sm: "row", md: "column", xl: "row" }}
										gap={1}
									>
										<StatusBadge color="secondary">Pending</StatusBadge> | Tanggal Pembayaran Disini
									</Stack>
								</DetailDescription>
							</DetailItem>
							<DetailItem>
								<DetailTitle>Coupon</DetailTitle>
								<DetailDescription>
									Diskon Spesial Natal ( -Rp 25.000 ) | 85F42FEG02
								</DetailDescription>
							</DetailItem>
							<DetailItem>
								<DetailTitle>Customer note</DetailTitle>
								<DetailDescription>
									<p>
										Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est, dolores unde.
										Suscipit, omnis maxime. Quos doloremque hic laborum incidunt nostrum, impedit
										nulla ex aperiam ad similique. Quibusdam fuga esse illo!
									</p>
								</DetailDescription>
							</DetailItem>
							<DetailItem>
								<DetailTitle>Order note</DetailTitle>
								<DetailDescription>
									<TextInput multiline rows={5} id="orderNote" label="" />
									<Stack direction="row" justifyContent="flex-end" sx={{ mt: 1 }}>
										<Button size="small">Save Note</Button>
									</Stack>
								</DetailDescription>
							</DetailItem>
						</DetailsContainer>
					</Grid>
					<Grid item xs={12} md={6}>
						<Section>
							<SectionTitle>Detail Pesanan</SectionTitle>
							<OrderCardContainer>
								<OrderCard
									title="Ventela Lost Angel"
									sizeDesc="EU 37"
									qtyDesc="1"
									price="700.000"
								/>
								<OrderCard
									title="Nike AF1 Homesick"
									sizeDesc="EU 40"
									qtyDesc="1"
									price="3.920.000"
								/>
								<OrderCard
									title="Nike AF1 Homesick"
									sizeDesc="EU 40"
									qtyDesc="1"
									price="3.920.000"
								/>
							</OrderCardContainer>
						</Section>
						<Section>
							<SectionTitle>Rincian Pembayaran</SectionTitle>
							<InfoContainer>
								<InfoTitle>Metode Pembayaran</InfoTitle>
								<InfoDescription>BCA Bank Transfer</InfoDescription>
							</InfoContainer>
							<Divider flexItem sx={{ mb: 1 }} />
							<InfoContainer>
								<InfoTitle>Subtotal Produk</InfoTitle>
								<InfoDescription>Rp 6.845.000</InfoDescription>
							</InfoContainer>
							<InfoContainer>
								<InfoTitle>Biaya Pengiriman</InfoTitle>
								<InfoDescription>Rp 100.000</InfoDescription>
							</InfoContainer>
							<InfoContainer>
								<InfoTitle>Diskon / Potongan Harga</InfoTitle>
								<InfoDescription>Rp 80.000</InfoDescription>
							</InfoContainer>
							<InfoContainer>
								<TotalPriceText>
									<strong>Total Pesanan</strong>
								</TotalPriceText>
								<TotalPriceText>
									<strong>Rp 6.720.000</strong>
								</TotalPriceText>
							</InfoContainer>
						</Section>
					</Grid>
				</Grid>
			</ContentContainer>
			<ContentContainer>
				<Grid container spacing={3}>
					<Grid item xs={12} md={6}>
						<Section>
							<SectionTitle>Pengiriman</SectionTitle>
							<InfoContainer>
								<InfoTitle>Kurir</InfoTitle>
								<InfoDescription>JNE Regular (1-3 hari)</InfoDescription>
							</InfoContainer>
							<InfoContainer>
								<InfoTitle>No Resi</InfoTitle>
								<InfoDescription>
									<IconButton sx={{ mr: 1 }}>
										<ContentCopyIcon sx={{ fontSize: "1.8rem" }} />
									</IconButton>
									ABCDEFG123456789
								</InfoDescription>
							</InfoContainer>
							<AddressContainer>
								<InfoTitle>Alamat Penerima :</InfoTitle>
								<AddressName>Mikici Cimol</AddressName>
								<AddressNumber>+62 878 1234 1234</AddressNumber>
								<Address>
									Kedai Vegetarian Kan En, Jl. DR. Setia Budi, Kec. Pontianak Sel.,{" "}
								</Address>
								<Address>
									Kota Pontianak, Kalimantan Barat, 78391 Rumah No. 46A ( Samping Showroom Vespa )
								</Address>
								<Address>Pontianak Selatan, Kota Pontianak Kalimantan Barat 78391</Address>
							</AddressContainer>
						</Section>
					</Grid>
					<Grid item xs={12} md={6}>
						<Section>
							<SectionTitle>Timeline Pesanan</SectionTitle>
							<Timeline
								items={[
									{
										date: "22 Aug 2022, 10:46",
										desc: "Paket telah diterima oleh Mikici Cimol"
									},
									{
										date: "22 Aug 2022, 10:20",
										desc: "Paket sedang diantarkan kurir ke alamat penerima"
									},
									{
										date: "18 Aug 2022, 20:15",
										desc: "Barang telah sampai digudang transit (Pontianak)"
									},
									{
										date: "10 Aug 2022, 17:15",
										desc: "Produk telah selesai (finishing)"
									},
									{
										date: "8 Aug 2022, 12:00",
										desc: "Produk dalam proses pengerjaan (painting)"
									},
									{
										date: "7 Aug 2022, 10:20",
										desc: "Pembayaran berhasil & pesanan dikonfirmasi"
									}
								]}
							/>
						</Section>
					</Grid>
				</Grid>
			</ContentContainer>
		</OrderDetailsContainer>
	);
};

export default OrderDetails;
