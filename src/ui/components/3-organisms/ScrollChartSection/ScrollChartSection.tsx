import {
	ChartData,
	ContentBox,
	ScrollableBarChart,
	StaticSectionHeading,
} from '@/ui/components';
import classNames from 'classnames';
import { Suspense } from 'react';
import styles from './ScrollChartSection.module.scss';
import { getBudgetOverview } from '@/lib/api/budget/fetch';

export default interface ScrollChartSectionProps {
	slug: string[];
	year: string;
}

export const ScrollChartSection: React.FC<ScrollChartSectionProps> = async ({
	slug,
	year,
}) => {
	const budgetInformation = await getBudgetOverview(year);

	const defaultChartData: ChartData = {
		labels: [],
		datasets: [
			{ label: 'Utgifter', data: [] },
			{ label: 'Inkomster', data: [] },
		],
	};

	return (
		<ContentBox className={classNames(styles.scroll_chart_section)}>
			<StaticSectionHeading>Översikt</StaticSectionHeading>
			<Suspense fallback={<div>hej</div>}>
				<div className={classNames(styles.scroll_chart_chart)}>
					<ScrollableBarChart
						chartData={budgetInformation || defaultChartData}
						legend
					/>
				</div>
			</Suspense>
		</ContentBox>
	);
};
