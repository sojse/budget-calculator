import classNames from 'classnames';
import styles from './BudgetChart.module.scss';
import { BarChart, ChartData, InformationMessage } from '@/ui/components';
import { formatCost } from '@/helpers/number';
import { fetchBudget } from '@/lib/api/budget';

export interface BudgetChartProps {
	slug: string[];
}

export const BudgetChart: React.FC<BudgetChartProps> = async ({ slug }) => {
	const budgetData = await fetchBudget(slug);
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
					<span>{formatCost(income)}</span>
					<span>- {formatCost(expense)}</span>
				</div>
			</div>
			<span className={classNames(styles.budget_overview_sum)}>
				<span>Summa:</span>
				<span className={classNames(styles.budget_overview_amount)}>
					{formatCost(totalAmount)} kr
				</span>
			</span>
			{totalAmount >= 0 ? (
				<InformationMessage
					style="positive"
					message="Hushållet har ett överskott"
				/>
			) : (
				<InformationMessage
					style="negative"
					message="Hushållet har ett underskott"
				/>
			)}
		</>
	);
};
