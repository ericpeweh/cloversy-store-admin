// Dependencies
import React from "react";
import dynamic from "next/dynamic";
import { green, orange } from "@mui/material/colors";

// Styles
import { AreaChartContainer } from "./AreaChart.styles";

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

interface AreaChartProps {
	title: string;
	type: "sales" | "visitors";
}

const AreaChart = ({ title, type = "sales" }: AreaChartProps) => {
	const isSale = type === "sales";

	return (
		<AreaChartContainer>
			<SectionTitle>{title}</SectionTitle>
			<ResponsiveContainer width="100%" height="100%">
				<AreaChartBase
					height={1600}
					width={900}
					data={data}
					margin={{
						top: 20,
						right: 0,
						left: -30,
						bottom: 20
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip
						labelStyle={{ fontSize: "1.8rem", fontWeight: 600 }}
						itemStyle={{
							fontSize: "1.4rem",
							color: "#333",
							textTransform: "uppercase"
						}}
					/>
					<Area
						type="monotone"
						dataKey={type}
						stackId="1"
						stroke={isSale ? green[200] : orange[200]}
						fill={isSale ? green[100] : orange[100]}
					/>
				</AreaChartBase>
			</ResponsiveContainer>
		</AreaChartContainer>
	);
};

export default AreaChart;
