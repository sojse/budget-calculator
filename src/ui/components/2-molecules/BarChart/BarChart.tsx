'use client';
import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './BarChart.module.scss';
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

export interface BarChartProps {
	className?: string;
	chartData: {
		labels: string[];
		datasets: [
			{
				label: string;
				data: number[];
				backgroundColor?: string | string[];
			},
		];
	};
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
		<div className={classNames(styles.information_message, className)}>
			<span>hej</span>
			<Bar
				data={chartData}
				options={{ ...options, indexAxis: horizontal ? 'y' : 'x' }}
			/>
		</div>
	);
};
// ['#1d4eff', '#ff8c4b']
