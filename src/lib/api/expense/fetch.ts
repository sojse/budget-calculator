import gql from 'graphql-tag';
import { getClient } from '@/lib/apolloClient';
import { capitalizeFirstLetter } from '@/helpers/string';
import { DonutChartProps } from '@/ui/components';
import { getBudgetId } from '../budget/fetch';

const GET_EXPENSE_DETAILS = gql`
	query BudgetQuery($budgetId: ID!) {
		budget(id: $budgetId) {
			id
			title
			expensesByCategory {
				expensesByCategory {
					title
					amount
				}
				totalSum
				category
			}
			expenses {
				totalSum
			}
		}
	}
`;

export const getBudgetWithCategoryDetails = async (slug: string[]) => {
	const year = slug ? slug[1] : '';
	const month = slug ? capitalizeFirstLetter(slug[0]) : '';
	const client = getClient();
	const id = await getBudgetId(year, month);
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
};

export const getFinanceDetailData = async (slug: string[]) => {
	const year = slug ? slug[1] : '';
	const month = slug ? capitalizeFirstLetter(slug[0]) : '';
	const client = getClient();
	const id = await getBudgetId(year, month);
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
};
