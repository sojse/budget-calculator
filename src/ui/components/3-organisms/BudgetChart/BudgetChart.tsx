import classNames from 'classnames';
import styles from './BudgetChart.module.scss';
import { BarChart, ChartData, InformationMessage } from '@/ui/components';
import { formatCost } from '@/helpers/number';
import { fetchBudget } from '@/lib/api/budget/fetch';

export interface BudgetChartProps {
	slug: string[];
	loading?: boolean;
}

export const BudgetChart: React.FC<BudgetChartProps> = async ({
	slug,
	loading = false,
}) => {
	let budgetData = { budgetOverview: [0, 0] };

	if (!loading) {
		budgetData = await fetchBudget(slug);
	}

	const chartData: ChartData = {
		labels: ['Income', 'Expense'],
		datasets: [
			{
				label: 'Amount',
				data: budgetData.budgetOverview,
			},
		],
	};
	const income = chartData.datasets[0].data[0];
	const expense = chartData.datasets[0].data[1];
	const totalAmount = income - expense;

	return (
		<>
			<div className={classNames(styles.budget_overview_chart)}>
				<BarChart chartData={chartData} showLabels={false} horizontal={true} />
				<div className={classNames(styles.budget_overview_chart_text)}>
					<span
						className={classNames(
							loading &&
								'u-skeleton-text u-skeleton-text--thin u-skeleton-text--short'
						)}
					>
						{!loading && formatCost(income)}
					</span>
					<span
						className={classNames(
							loading &&
								'u-skeleton-text u-skeleton-text--thin u-skeleton-text--short'
						)}
					>
						- {formatCost(expense)}
					</span>
				</div>
			</div>
			<span className={classNames(styles.budget_overview_sum)}>
				<span className={classNames(loading && 'u-skeleton-text')}>Summa:</span>
				<span
					className={classNames(
						styles.budget_overview_amount,
						loading && 'u-skeleton-text u-skeleton-text--medium'
					)}
				>
					{!loading && formatCost(totalAmount) + ' kr'}
				</span>
			</span>
			{totalAmount >= 0 ? (
				<InformationMessage
					style="positive"
					message="Hushållet har ett överskott"
					loading={loading}
				/>
			) : (
				<InformationMessage
					style="negative"
					message="Hushållet har ett underskott"
					loading={loading}
				/>
			)}
		</>
	);
};
