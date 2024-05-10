import classNames from 'classnames';
import styles from './ExpenseOverview.module.scss';
import { DonutChart, Heading } from '@/ui/components';
import { getBudgetWithCategoryDetails } from '@/lib/api/budget';

export interface ExpenseOverviewProps {
	slug: string[];
}

export const ExpenseOverview: React.FC<ExpenseOverviewProps> = async ({ slug }) => {
	const budgetData = await getBudgetWithCategoryDetails(slug);

	return (
		<div className={classNames(styles.expense_overview)}>
			<Heading headingLevel={'h2'} style="md" color="dark">
				Översikt
			</Heading>
			<div className={classNames(styles.expense_overview_chart)}>
				<DonutChart
					chartData={budgetData.budgetOverview.chartData}
					totalAmount={budgetData.budgetOverview.totalAmount}
					showLabels={true}
				/>
			</div>
		</div>
	);
};
