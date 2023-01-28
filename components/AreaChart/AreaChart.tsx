// Dependencies
import React from "react";
import { orange } from "@mui/material/colors";

// Styles
import { AreaChartContainer } from "./AreaChart.styles";

// Hooks
import useWindowSize from "../../hooks/useWindowSize";

// Utils
import getYearInputOptions from "../../utils/getYearInputOptions";

// Components
import {
	AreaChart as AreaChartBase,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer
} from "recharts";
import SectionTitle from "../SectionTitle/SectionTitle";
import SelectInput from "../SelectInput/SelectInput";
import { SelectChangeEvent, Stack } from "@mui/material";

interface AreaChartProps {
	title: string;
	dataKey: string;
	data: any[];
	strokeColor?: string;
	fillColor?: string;
	allowDecimal?: boolean;
	yearFilter?: string;
	onYearFilterChange?: (event: SelectChangeEvent<unknown>, child: React.ReactNode) => void;
}

const AreaChart = ({
	title,
	data,
	dataKey,
	strokeColor = orange[200],
	fillColor = orange[100],
	allowDecimal = true,
	yearFilter,
	onYearFilterChange
}: AreaChartProps) => {
	const { wWidth } = useWindowSize();

	return (
		<AreaChartContainer>
			<Stack direction="row" justifyContent="space-between" alignItems="center">
				<SectionTitle sx={{ width: "100%" }}>{title}</SectionTitle>
				{yearFilter && onYearFilterChange && (
					<SelectInput
						options={getYearInputOptions()}
						onChange={onYearFilterChange}
						value={yearFilter}
						size="small"
						sx={{
							width: { xs: "max-content" },
							ml: "auto"
						}}
					/>
				)}
			</Stack>
			<ResponsiveContainer width={wWidth < 600 ? 800 : "100%"} height="100%">
				<AreaChartBase
					height={1600}
					width={900}
					data={data}
					margin={{
						top: 20,
						right: 0,
						left: wWidth > 600 ? -15 : -25,
						bottom: 20
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis allowDecimals={allowDecimal} />
					<Tooltip
						labelStyle={{
							fontSize: wWidth < 600 ? "1.4rem" : "1.8rem",
							fontWeight: 600
						}}
						itemStyle={{
							fontSize: wWidth < 600 ? "1.2rem" : "1.4rem",
							color: "#333",
							textTransform: "uppercase"
						}}
					/>
					<Area
						type="monotone"
						dataKey={dataKey}
						stackId="1"
						stroke={strokeColor}
						fill={fillColor}
					/>
				</AreaChartBase>
			</ResponsiveContainer>
		</AreaChartContainer>
	);
};

export default AreaChart;
