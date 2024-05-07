'use client';
import React from 'react';
import classNames from 'classnames';
import styles from './DonutChart.module.scss';
import colors from '../Chart.module.scss';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import { formatCost } from '@/helpers/number';
import { ChartLabel } from '@/ui/components';

export type DonutData = {
	labels: string[];
	datasets: [
		{
			label: string;
			data: number[];
			backgroundColor: string[];
		},
	];
};
export interface DonutChartProps {
	chartData: DonutData;
	totalAmount: number;
	showLabels?: boolean;
	showGrid?: boolean;
}

export const DonutChart: React.FC<DonutChartProps> = ({
	chartData,
	totalAmount,
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
				display: false,
			},
			y: {
				grid: {
					drawOnChartArea: showGrid,
				},
				display: false,
			},
		},
		borderWidth: 0,
		hoverBorderWidth: 2,
		cutout: '65%',
	};

	chartData.datasets[0].backgroundColor = [];

	chartData.labels.forEach((label) => {
		const lowercaseLabel = label.toLowerCase();
		if (chartData.datasets[0]) {
			if (colors[lowercaseLabel]) {
				chartData.datasets[0].backgroundColor.push(colors[lowercaseLabel]);
			} else {
				chartData.datasets[0].backgroundColor.push(colors['income']);
			}
		}
	});

	return (
		<div className={classNames(styles.bar_chart)}>
			<div className={classNames(styles.bar_chart_chart)}>
				<Doughnut data={chartData} options={options} />
				<div className={classNames(styles.bar_chart_middle)}>
					<span
						className={classNames(styles.bar_chart_amount)}
					>{`${formatCost(totalAmount)} kr`}</span>
					<span className={classNames(styles.bar_chart_text)}>Spenderat</span>
				</div>
			</div>

			{showLabels && (
				<div className={classNames(styles.bar_chart_labels)}>
					{chartData.labels.map((label: string, index: number) => {
						const itemAmount = chartData.datasets[0].data[index];
						const percentage = Math.round((itemAmount / totalAmount) * 100);
						return (
							<div key={index}>
								<ChartLabel label={label} amount={`${percentage} %`} />
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};
