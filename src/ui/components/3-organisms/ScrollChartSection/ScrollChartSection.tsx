import { ChartData, ScrollableBarChart } from '@/ui/components';
import classNames from 'classnames';
import styles from './ScrollChartSection.module.scss';
import { getBudgetOverview } from '@/lib/api/budget/fetch';

export default interface ScrollChartSectionProps {
	year: string;
	loading?: boolean;
}

export const ScrollChartSection: React.FC<ScrollChartSectionProps> = async ({
	year,
	loading = false,
}) => {
	const defaultData: ChartData = {
		labels: [],
		datasets: [
			{ label: 'Utgifter', data: [] },
			{ label: 'Inkomster', data: [] },
		],
	};

	let budgetInformation: ChartData | undefined;

	if (!loading) {
		budgetInformation = await getBudgetOverview(year);
	}

	return (
		<section className={classNames(styles.scroll_chart_chart)}>
			<ScrollableBarChart
				chartData={budgetInformation || defaultData}
				legend
				loading={loading}
			/>
		</section>
	);
};
