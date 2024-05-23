'use client';
import React from 'react';
import classNames from 'classnames';
import styles from './BarChart.module.scss';
import variables from '../Chart.module.scss';
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import { getChartOptions } from '@/helpers/chart';
import { useChartData } from '@/hooks/useChartData';
import { LegendButtons } from '../LegendButtons';

export type ChartData = {
	labels: string[];
	datasets: {
		label: string;
		data: number[];
		backgroundColor?: string | string[];
		hidden?: boolean;
	}[];
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
	const [data, setData] = useChartData(chartData, variables);
	const chartOptions = getChartOptions(showGrid, showLabels, horizontal);

	return (
		<div className={classNames(styles.bar_chart, className)}>
			<Bar
				data={data}
				options={{ ...chartOptions, indexAxis: horizontal ? 'y' : 'x' }}
			/>
		</div>
	);
};
