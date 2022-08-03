// Dependencies
import React from "react";
import { orange } from "@mui/material/colors";

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

interface AreaChartProps {
	title: string;
	dataKey: string;
	data: any[];
	strokeColor?: string;
	fillColor?: string;
}

const AreaChart = ({
	title,
	data,
	dataKey,
	strokeColor = orange[200],
	fillColor = orange[100]
}: AreaChartProps) => {
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
						left: -15,
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
