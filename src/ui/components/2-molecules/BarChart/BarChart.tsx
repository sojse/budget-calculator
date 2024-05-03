'use client';
import React from 'react';
import classNames from 'classnames';
import styles from './BarChart.module.scss';
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

export type ChartData = {
	labels: string[];
	datasets: [
		{
			label: string;
			data: number[];
			backgroundColor?: string | string[];
		},
	];
};
export interface BarChartProps {
	className?: string;
	chartData: ChartData;
	horizontal?: boolean;
	showLabels?: boolean;
	showGrid?: boolean;
}

export const BarChart: React.FC<BarChartProps> = ({
	className,
	chartData,
	horizontal = false,
	showLabels = true,
	showGrid = false,
}) => {
	const options = {
		plugins: { legend: { display: false } },
		scales: {
			x: {
				grid: {
					drawOnChartArea: showGrid,
				},
				display: showLabels,
			},
			y: {
				grid: {
					drawOnChartArea: showGrid,
				},
				display: showLabels,
			},
		},
		borderRadius: 4,
	};
	chartData.datasets[0].backgroundColor = ['#1d4eff', '#ff8c4b'];

	return (
		<div className={classNames(styles.bar_chart, className)}>
			<Bar
				data={chartData}
				options={{ ...options, indexAxis: horizontal ? 'y' : 'x' }}
			/>
		</div>
	);
};
