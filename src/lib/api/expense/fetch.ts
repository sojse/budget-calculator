import { getClient } from '@/lib/apolloClient';
import { capitalizeFirstLetter } from '@/helpers/string';
import { DonutChartProps } from '@/ui/components';
import { getBudgetId } from '../budget/fetch';
import { GET_EXPENSE_DETAILS } from './graphql';

export const getBudgetWithCategoryDetails = async (slug: string[]) => {
	const client = getClient();
	const id = await getBudgetId(slug);
	try {
		const { data } = await client.query({
			query: GET_EXPENSE_DETAILS,
			variables: { budgetId: id },
			context: {
				fetchOptions: {
					next: { tags: ['budget'] },
				},
			},
		});

		const budgetOverview: DonutChartProps = {
			chartData: {
				labels: [],
				datasets: [
					{
						label: 'Amount',
						data: [],
						backgroundColor: [],
					},
				],
			},

			totalAmount: data.budget.expenses.totalSum,
		};

		data.budget.expensesByCategory.forEach(
			(item: { category: string; totalSum: number }) => {
				budgetOverview.chartData.labels.push(
					capitalizeFirstLetter(item.category.toLowerCase())
				);
				budgetOverview.chartData.datasets[0].data.push(item.totalSum);
			}
		);

		return {
			budgetId: id,
			budgetOverview,
		};
	} catch (error) {
		console.error('An error occured', error);
	}
};

export const getFinanceDetailData = async (slug: string[]) => {
	const client = getClient();
	const id = await getBudgetId(slug);
	try {
		const { data } = await client.query({
			query: GET_EXPENSE_DETAILS,
			variables: { budgetId: id },
			context: {
				fetchOptions: {
					next: { tags: ['budget'] },
				},
			},
		});

		const budgetData = data.budget.expensesByCategory.map(
			(
				item: { expensesByCategory: any; totalSum: any; category: string },
				index: number
			) => {
				return {
					data: item.expensesByCategory,
					amount: item.totalSum,
					categoryType: { category: item.category.toLowerCase() },
				};
			}
		);

		return budgetData;
	} catch (error) {
		console.error('An error occured', error);
	}
};
