import { fetchBudget, fetchStaticParams } from '@/lib/api/budget';
import { FinanceList, TwoColumnLayout } from '@/ui/components';
import { BarChart } from '@/ui/components/2-molecules/BarChart/BarChart';

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
					<BarChart
						chartData={{
							labels: ['Bar 1', 'Bar 2', 'Bar 3', 'Bar 4'],
							datasets: [
								{
									label: 'Label 1',
									data: [1, 2, 3, 4],
								},
							],
						}}
					/>
				}
			/>
		</>
	);
}
