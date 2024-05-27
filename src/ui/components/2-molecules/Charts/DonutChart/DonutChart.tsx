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
	datasets: {
		label: string;
		data: number[];
		backgroundColor: string[];
	}[];
};
export interface DonutChartProps {
	className?: string;
	chartData: DonutData;
	totalAmount: number;
	showLabels?: boolean;
	showGrid?: boolean;
	loading?: boolean;
	singleValue?: boolean;
}

export const DonutChart: React.FC<DonutChartProps> = ({
	className,
	chartData,
	totalAmount,
	showLabels = true,
	showGrid = false,
	loading = false,
	singleValue = false,
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

			if (singleValue) {
				chartData.datasets[0].backgroundColor.push(colors['empty']);
			}
		}
	});

	return (
		<div className={classNames(styles.donut_chart, className)}>
			<div className={classNames(styles.donut_chart_chart)}>
				<div>
					{!loading ? (
						<Doughnut data={chartData} options={options} />
					) : (
						<div className="u-skeleton-donut"></div>
					)}
				</div>

				<div className={classNames(styles.donut_chart_middle)}>
					<span
						className={classNames(
							styles.donut_chart_amount,
							loading && 'u-skeleton-text u-skeleton-text--long'
						)}
					>{`${formatCost(totalAmount)} kr`}</span>
					<span
						className={classNames(
							styles.donut_chart_text,
							loading && 'u-skeleton'
						)}
					>
						Spenderat
					</span>
				</div>
			</div>

			{showLabels && (
				<div className={classNames(styles.donut_chart_labels)}>
					{chartData.labels.map((label: string, index: number) => {
						const itemAmount = chartData.datasets[0].data[index];
						const percentage = Math.round((itemAmount / totalAmount) * 100);
						return (
							<div key={index}>
								<ChartLabel
									label={label}
									amount={`${percentage} %`}
									loading={loading}
								/>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};
