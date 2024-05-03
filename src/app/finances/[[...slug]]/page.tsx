import { fetchBudget, fetchStaticParams } from '@/lib/api/budget';
import { BudgetOverview, FinanceList, TwoColumnLayout } from '@/ui/components';

export async function generateStaticParams() {
	const mappedData = await fetchStaticParams();
	return mappedData;
}

export default async function Finance({
	params,
}: {
	params: { slug: string[] };
}) {
	const budgetData = await fetchBudget(params.slug);
	return (
		<>
			<TwoColumnLayout
				column1={
					<>
						<FinanceList
							listType={'expense'}
							listObjects={budgetData.expenses}
							budgetId={budgetData.budgetId}
						/>
						<FinanceList
							listType={'income'}
							listObjects={budgetData.incomes}
							budgetId={budgetData.budgetId}
						/>
					</>
				}
				column2={
					<BudgetOverview
						chartData={{
							labels: ['Income', 'Expense'],
							datasets: [
								{
									label: 'Amount',
									data: budgetData.budgetOverview,
								},
							],
						}}
					/>
				}
			/>
		</>
	);
}
