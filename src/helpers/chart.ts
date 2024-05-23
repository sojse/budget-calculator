import { ChartData } from 'chart.js';

export const getChartOptions = (
	showGrid: boolean,
	showLabels: boolean,
	horizontal: boolean
) => ({
	plugins: { legend: { display: false } },
	maintainAspectRatio: false,
	layout: { padding: { top: 10 } },
	scales: {
		x: {
			grid: { drawOnChartArea: showGrid },
			display: showLabels,
		},
		y: {
			beginAtZero: true,
			ticks: { display: false },
			grid: { drawTicks: false, drawOnChartArea: showGrid },
			display: showLabels,
		},
	},
	borderRadius: 4,
	indexAxis: horizontal ? 'y' : 'x',
});

export const getFixedScaleOptions = (
	showGrid: boolean,
	showLabels: boolean,
	horizontal: boolean
) => ({
	plugins: { legend: { display: false } },
	maintainAspectRatio: false,
	layout: { padding: { bottom: 51 } },
	scales: {
		x: {
			ticks: { display: false },
			grid: { drawTicks: false, drawOnChartArea: showGrid },
			display: showLabels,
		},
		y: {
			afterFit: (ctx: { width: number }) => {
				ctx.width = 40;
			},
			beginAtZero: true,
			grid: { drawTicks: false },
			display: showLabels,
		},
	},
	borderRadius: 4,
	indexAxis: horizontal ? 'y' : 'x',
});

export const calculateContainerWidth = (
	dataPoints: number,
	containerWidth: number
) => {
	const baseWidth = containerWidth || 660;
	const additionalWidthPerDataPoint = 132;
	const extraDataPoints = dataPoints > 5 ? dataPoints - 5 : 0;
	return `${baseWidth + extraDataPoints * additionalWidthPerDataPoint}px`;
};

export const prepareChartData = (
	chartData: ChartData,
	colors: { readonly [key: string]: string }
) => {
	if (chartData.datasets.length === 1) {
		chartData.datasets[0].backgroundColor = [colors.income, colors.expense];
	} else if (chartData.datasets.length === 2) {
		chartData.datasets[0].backgroundColor = colors.expense;
		chartData.datasets[1].backgroundColor = colors.income;
	}
	chartData.datasets.forEach((dataset) => (dataset.hidden = false));
	return chartData;
};
