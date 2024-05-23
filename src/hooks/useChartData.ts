import { ChartData } from 'chart.js';
import { useState, useEffect } from 'react';
import type { ChartData as ChartJsData } from 'chart.js';

export const useChartData = (
	initialData: ChartData,
	colors: { readonly [key: string]: string }
) => {
	const processChartData = (data: ChartData) => {
		const updatedData = { ...data };
		if (updatedData.datasets.length === 1) {
			updatedData.datasets[0].backgroundColor = [colors.income, colors.expense];
		} else if (updatedData.datasets.length === 2) {
			updatedData.datasets[0].backgroundColor = colors.expense;
			updatedData.datasets[1].backgroundColor = colors.income;
		}
		updatedData.datasets.forEach((dataset) => (dataset.hidden = false));
		return updatedData as ChartJsData<'bar'>;
	};

	const [data, setData] = useState<ChartJsData<'bar'>>(
		processChartData(initialData)
	);

	useEffect(() => {
		setData(processChartData(initialData));
	}, [initialData, colors]);

	return [data, setData] as const;
};
