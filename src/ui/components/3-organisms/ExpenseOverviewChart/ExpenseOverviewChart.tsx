import classNames from 'classnames';
import styles from './ExpenseOverviewChart.module.scss';
import { DonutChart } from '@/ui/components';
import { getBudgetWithCategoryDetails } from '@/lib/api/expense/fetch';

export interface ExpenseOverviewChartProps {
	slug: string[];
	loading?: boolean;
}

export const ExpenseOverviewChart: React.FC<ExpenseOverviewChartProps> = async ({
	slug,
	loading = false,
}) => {
	let budgetData = {
		budgetOverview: {
			chartData: {
				labels: ['', '', '', '', '', ''],
				datasets: [
					{
						label: '',
						data: [0],
						backgroundColor: [''],
					},
				],
			},
			totalAmount: 0,
		},
	};

	if (!loading) {
		const fetchData = await getBudgetWithCategoryDetails(slug);
		if (fetchData) {
			budgetData = fetchData;
		}
	}

	return (
		<div className={classNames(styles.expense_overview)}>
			<DonutChart
				chartData={budgetData.budgetOverview.chartData}
				totalAmount={budgetData.budgetOverview.totalAmount}
				showLabels={true}
				loading={loading}
			/>
		</div>
	);
};
