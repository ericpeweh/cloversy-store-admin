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
import usePagination from "../../hooks/usePagination";

// Components
import { Divider, Grid, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import PageTitle from "../../components/PageTitle/PageTitle";
import SelectInput from "../../components/SelectInput/SelectInput";
import Pagination from "../../components/Pagination/Pagination";
import TextInput from "../../components/TextInput/TextInput";
import CustomerListItem from "../../components/CustomerListItem/CustomerListItem";
import CustomerListCard from "../../components/CustomerListCard/CustomerListCard";

type DisplayModeType = "list" | "card";

const Customers = () => {
	const [displayMode, setDisplayMode] = useState<DisplayModeType>("card");
	const { page, onChange: paginationChangeHandler } = usePagination();

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
					<TextInput label="" placeholder="Search customer..." id="search-customer" size="small" />
				</Stack>
				<Stack direction="row" justifyContent="flex-end" gap={{ xs: 1, sm: 2 }}>
					<SelectInput
						options={["User status", "Active", "Banned"]}
						value={"User status"}
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

			{displayMode === "list" ? (
				<CustomersList>
					{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
						<React.Fragment key={item}>
							<CustomerListItem />
							<Divider />
						</React.Fragment>
					))}
				</CustomersList>
			) : (
				<CustomersCardList>
					<Grid container spacing={{ xs: 1, md: 2, lg: 3 }}>
						{[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
							<Grid item xs={6} sm={4} xl={3} key={item}>
								<CustomerListCard />
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
					count={10}
					shape="rounded"
					color="primary"
				/>
			</Stack>
		</CustomersContainer>
	);
};

export default Customers;
