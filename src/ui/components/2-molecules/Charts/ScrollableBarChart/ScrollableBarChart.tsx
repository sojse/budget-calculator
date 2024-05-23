'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './ScrollableBarChart.module.scss';
import variables from '../Chart.module.scss';
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import { useBudgetId } from '@/hooks/useBudgetId';
import {
	calculateContainerWidth,
	getChartOptions,
	getFixedScaleOptions,
} from '@/helpers/chart';
import { useChartData } from '@/hooks/useChartData';
import { ChartData, LegendButtons } from '@/ui/components';

export interface ScrollableBarChartProps {
	className?: string;
	chartData: ChartData;
	showLabels?: boolean;
	showGrid?: boolean;
	legend?: boolean;
}

export const ScrollableBarChart: React.FC<ScrollableBarChartProps> = ({
	className,
	chartData,
	showLabels = true,
	showGrid = false,
	legend = false,
}) => {
	const { selectedIndex } = useBudgetId();
	const scrollableContainerRef = useRef<HTMLDivElement>(null);
	const baseWidth = 660;
	const [data, setData] = useChartData(chartData, variables);
	const chartOptions = getChartOptions(showGrid, showLabels, false);
	const fixedScale = getFixedScaleOptions(showGrid, showLabels, false);

	const isScrollable = useMemo(
		() => chartData.datasets[0].data.length > 5,
		[chartData.datasets]
	);
	const containerWidth = useMemo(
		() =>
			calculateContainerWidth(
				chartData.datasets[0].data.length,
				scrollableContainerRef.current?.clientWidth || baseWidth
			),
		[chartData.datasets]
	);

	useEffect(() => {
		if (scrollableContainerRef.current && isScrollable) {
			const additionalWidthPerDataPoint = 132;
			const scrollPosition =
				selectedIndex * additionalWidthPerDataPoint - baseWidth;
			scrollableContainerRef.current.scrollTo({
				left: scrollPosition,
				behavior: 'smooth',
			});
		}
	}, [selectedIndex, isScrollable]);

	return (
		<div className={classNames(styles.bar_chart, className)}>
			{legend && <LegendButtons chartData={chartData} setData={setData} />}
			<div className={classNames(styles.bar_chart_scrollable)}>
				<div className={classNames(styles.bar_chart_scrollable_fixed_scale)}>
					<Bar data={data} options={{ ...fixedScale, indexAxis: 'x' }} />
				</div>
				<div
					className={classNames(
						isScrollable && styles.bar_chart_scrollable_chart
					)}
					ref={scrollableContainerRef}
				>
					<div
						className={classNames(styles.bar_chart_scrollable_chart_container)}
						style={{ width: containerWidth }}
					>
						<Bar data={data} options={{ ...chartOptions, indexAxis: 'x' }} />
					</div>
				</div>
			</div>
		</div>
	);
};
