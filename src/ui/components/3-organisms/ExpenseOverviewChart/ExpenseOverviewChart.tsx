import classNames from 'classnames';
import styles from './ExpenseOverviewChart.module.scss';
import { DonutChart } from '@/ui/components';
import { getBudgetWithCategoryDetails } from '@/lib/api/expense/fetch';

export interface ExpenseOverviewChartProps {
	slug: string[];
}

export const ExpenseOverviewChart: React.FC<
	ExpenseOverviewChartProps
> = async ({ slug }) => {
	const budgetData = await getBudgetWithCategoryDetails(slug);

	return (
		<div className={classNames(styles.expense_overview_chart)}>
			<DonutChart
				chartData={budgetData.budgetOverview.chartData}
				totalAmount={budgetData.budgetOverview.totalAmount}
				showLabels={true}
			/>
		</div>
	);
};
