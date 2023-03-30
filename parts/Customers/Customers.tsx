// Dependencies
import React, { useState } from "react";

// Styles
import {
	CustomersCardList,
	CustomersContainer,
	CustomersHeader,
	CustomersList
} from "./Customers.styles";

// Icons
import GridViewIcon from "@mui/icons-material/GridView";
import TableRowsIcon from "@mui/icons-material/TableRows";

// Hooks
import { useGetCustomersQuery } from "../../api/customer.api";
import useSelector from "../../hooks/useSelector";
import usePagination from "../../hooks/usePagination";
import useDebounce from "../../hooks/useDebounce";

// Types
import { CustomersFilterValues } from "../../interfaces";
import { Alert, SelectChangeEvent, Typography } from "@mui/material";

// Components
import {
	CircularProgress,
	Divider,
	Grid,
	Stack,
	ToggleButton,
	ToggleButtonGroup
} from "@mui/material";
import PageTitle from "../../components/PageTitle/PageTitle";
import SelectInput from "../../components/SelectInput/SelectInput";
import Pagination from "../../components/Pagination/Pagination";
import TextInput from "../../components/TextInput/TextInput";
import CustomerListItem from "../../components/CustomerListItem/CustomerListItem";
import CustomerListCard from "../../components/CustomerListCard/CustomerListCard";
import FallbackContainer from "../../components/FallbackContainer/FallbackContainer";
import BoxButton from "../../components/BoxButton/BoxButton";

type DisplayModeType = "list" | "card";

const Customers = () => {
	const isAuth = useSelector(state => state.auth.isAuth);
	const [displayMode, setDisplayMode] = useState<DisplayModeType>("card");
	const { page, onChange: paginationChangeHandler } = usePagination();
	const [searchInput, setSearchInput] = useState("");
	const [statusFilter, setStatusFilter] = useState("default");
	const searchQuery = useDebounce(searchInput, 500);

	const {
		data: customersData,
		isFetching: isGetCustomersLoading,
		isSuccess: isGetCustomersSuccess,
		error: getCustomersError,
		refetch: refetchCustomers
	} = useGetCustomersQuery(
		{ q: searchQuery, page, statusFilter },
		{
			skip: !isAuth
		}
	);
	const customersError: any = getCustomersError;
	const noDataFound = customersData?.data.customers.length === 0;

	const searchQueryChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(e.target.value);
	};

	const statusFilterChangeHandler = (e: SelectChangeEvent<unknown>) => {
		setStatusFilter(e.target.value as CustomersFilterValues);
	};

	const displayModeChangeHandler = (_: React.SyntheticEvent, newDisplayMode: DisplayModeType) => {
		if (newDisplayMode !== null) {
			setDisplayMode(newDisplayMode);
		}
	};

	return (
		<CustomersContainer>
			<PageTitle>Customers List</PageTitle>
			<CustomersHeader>
				<Stack direction="row" gap={2} sx={{ width: { xs: "100%", sm: "30rem" } }}>
					<TextInput
						label=""
						placeholder="Search customer..."
						id="search-customer"
						size="small"
						value={searchInput}
						onChange={searchQueryChangeHandler}
					/>
				</Stack>
				<Stack direction="row" justifyContent="flex-end" gap={{ xs: 1, sm: 2 }}>
					<SelectInput
						options={[
							{ label: "Show all", value: "default" },
							{ label: "Active", value: "active" },
							{ label: "Banned", value: "banned" }
						]}
						onChange={statusFilterChangeHandler}
						value={statusFilter}
						size="small"
					/>
					<ToggleButtonGroup
						value={displayMode}
						exclusive
						onChange={displayModeChangeHandler}
						aria-label="Customers display mode"
						sx={{ border: "none" }}
					>
						<ToggleButton value="card" size="small" sx={{ border: "none" }}>
							<GridViewIcon />
						</ToggleButton>
						<ToggleButton value="list" size="small" sx={{ border: "none" }}>
							<TableRowsIcon />
						</ToggleButton>
					</ToggleButtonGroup>
				</Stack>
			</CustomersHeader>

			{!isGetCustomersLoading && getCustomersError && (
				<FallbackContainer>
					<Alert severity="error">
						{customersError?.data?.message || "Error occured while fetching customers data."}
					</Alert>
					<BoxButton onClick={refetchCustomers}>Try again</BoxButton>
				</FallbackContainer>
			)}
			{isGetCustomersLoading && (
				<FallbackContainer>
					<CircularProgress />
				</FallbackContainer>
			)}
			{!isGetCustomersLoading && isGetCustomersSuccess && noDataFound && (
				<FallbackContainer>
					<Typography>No customers found!</Typography>
				</FallbackContainer>
			)}

			{!isGetCustomersLoading && isGetCustomersSuccess && customersData && !noDataFound && (
				<>
					{displayMode === "list" ? (
						<CustomersList>
							{customersData?.data.customers.map((customer, currIndex, arr) => (
								<React.Fragment key={customer.id}>
									<CustomerListItem customerData={customer} />
									{currIndex !== arr.length - 1 && <Divider />}
								</React.Fragment>
							))}
						</CustomersList>
					) : (
						<CustomersCardList>
							<Grid container spacing={{ xs: 1, md: 2, lg: 3 }}>
								{customersData?.data.customers.map(customer => (
									<Grid item xs={6} sm={4} xl={3} key={customer.id}>
										<CustomerListCard customerData={customer} />
									</Grid>
								))}
							</Grid>
						</CustomersCardList>
					)}

					<Stack
						justifyContent="flex-end"
						direction="row"
						mt={4}
						sx={{
							"@media screen and (max-width: 800px)": {
								justifyContent: "center"
							}
						}}
					>
						<Pagination
							page={page}
							onChange={paginationChangeHandler}
							count={customersData.totalPages}
							shape="rounded"
							color="primary"
						/>
					</Stack>
				</>
			)}
		</CustomersContainer>
	);
};

export default Customers;
