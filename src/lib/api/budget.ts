import gql from 'graphql-tag';
import { getClient } from '@/lib/apolloClient';
import { capitalizeFirstLetter } from '@/helpers/string';
import { extractYear } from '@/helpers/date';
import { revalidateTag } from 'next/cache';
import { Expense, Income } from '@/context/budgetIdContext';
import { ChartData, DonutChartProps, DonutData } from '@/ui/components';

export interface GraphQLResponse {
	budgets: {
		year: number;
		budgets: { title: string }[];
	}[];
}

const GET_BUDGETS = gql`
	query BudgetsQuery {
		budgets {
			year
			budgets {
				title
				id
				endDate
			}
		}
	}
`;

const GET_BUDGETS_BY_YEAR = gql`
	query BudgetsQuery($year: String!) {
		budgets(year: $year) {
			year
			budgets {
				title
				id
			}
		}
	}
`;

const CREATE_BUDGET = gql`
	mutation BudgetCreate($data: BudgetCreateDataInput!) {
		budgetCreate(data: $data) {
			description
			endDate
			startDate
			title
		}
	}
`;

const GET_BUDGET = gql`
	query BudgetQuery($budgetId: ID!) {
		budget(id: $budgetId) {
			id
			title
			incomes {
				totalSum
				incomes {
					title
					amount
					id
					monthlyTransaction
				}
			}
			expenses {
				totalSum
				expenses {
					title
					amount
					id
					monthlyTransaction
					categoryType
				}
			}
		}
	}
`;

const GET_BUDGET_CATEGORY = gql`
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

export const fetchStaticParams = async () => {
	const client = getClient();
	const { data } = await client.query({ query: GET_BUDGETS });

	return data.budgets.flatMap((item: { year: number; budgets: any[] }) =>
		item.budgets.map((budget: { title: string }) => ({
			slug: [budget.title.toLocaleLowerCase(), `${item.year}`],
		}))
	);
};

export const fetchBudgets = async (year: string) => {
	const client = getClient();
	const { data } = await client.query({
		query: GET_BUDGETS,
		context: {
			fetchOptions: {
				next: { tags: ['budgets'] },
			},
		},
	});

	const { budgets } = data;

	var selectedBudgets = [];
	if (year === '') {
		selectedBudgets = budgets[budgets.length - 1].budgets;
	} else {
		const filteredBudgets = budgets.filter(
			(item: any) => item.year.toString() === year
		);
		selectedBudgets = filteredBudgets[0].budgets;
	}

	const years = budgets.map((item: any) => ({
		value: `${item.year}`,
		caption: `${item.year}`,
	}));
	const months = selectedBudgets.map((budget: any) => ({
		value: budget.title.toLowerCase(),
		caption: budget.title,
	}));

	return { years, months };
};

export const fetchMonthData = async (year: string) => {
	const client = getClient();

	try {
		const { data } = await client.query({
			query: GET_BUDGETS_BY_YEAR,
			variables: { year },
		});

		const { budgets } = data;

		const matchingYearBudgets = budgets.find(
			(item: any) => item.year === parseInt(year, 10)
		);

		if (!matchingYearBudgets) {
			return [];
		}

		const months = matchingYearBudgets.budgets.map((budget: any) => ({
			value: budget.title,
			caption: budget.title,
		}));

		return months;
	} catch (error) {
		console.error(`Error fetching budgets for year ${year}:`, error);
	}
};

export const createBudget = async (budgetData: any) => {
	const client = getClient();
	try {
		const { data } = await client.mutate({
			variables: {
				data: {
					title: budgetData.budgetTitle,
					description: budgetData.description,
					startDate: budgetData.startDate,
					endDate: budgetData.endDate,
				},
			},
			mutation: CREATE_BUDGET,
		});

		const slug = `${data.budgetCreate.title.toLowerCase()}/${extractYear(data.budgetCreate.endDate)}`;

		revalidateTag('budgets');

		return { success: true, newRoute: `/finances/${slug}` };
	} catch (error) {
		console.error('An error occured', error);
		return { success: false };
	}
};

export const fetchBudget = async (slug: string[]) => {
	const year = slug ? slug[1] : '';
	const month = slug ? capitalizeFirstLetter(slug[0]) : '';
	const client = getClient();
	const id = await getBudgetId(year, month);
	const { data } = await client.query({
		query: GET_BUDGET,
		variables: { budgetId: id },
		context: {
			fetchOptions: {
				next: { tags: ['budget'] },
			},
		},
	});

	const incomes = data.budget.incomes.incomes;
	const expenses = data.budget.expenses.expenses;

	return {
		budgetId: id,
		incomes: incomes.map((income: Income) => ({
			category: 'income',
			data: {
				title: income.title,
				amount: income.amount,
				monthlyTransaction: income.monthlyTransaction,
				id: income.id,
				categoryType: { category: 'income' },
			},
		})),
		expenses: expenses.map((expense: Expense) => ({
			category: 'expense',
			data: {
				title: expense.title,
				amount: expense.amount,
				monthlyTransaction: expense.monthlyTransaction,
				id: expense.id,
				categoryType: {
					category: expense.categoryType?.toString().toLowerCase(),
				},
			},
		})),
		budgetOverview: [
			data.budget.incomes.totalSum,
			data.budget.expenses.totalSum,
		],
	};
};

export const getBudgetWithCategoryDetails = async (slug: string[]) => {
	const year = slug ? slug[1] : '';
	const month = slug ? capitalizeFirstLetter(slug[0]) : '';
	const client = getClient();
	const id = await getBudgetId(year, month);
	const { data } = await client.query({
		query: GET_BUDGET_CATEGORY,
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

const getBudgetId = async (year: string, month: string) => {
	const client = getClient();
	const { data } = await client.query({ query: GET_BUDGETS });
	var id = '';

	data.budgets.forEach(
		(element: {
			year: { toString: () => string };
			budgets: { title: string; id: string }[];
		}) => {
			if (element.year.toString() === year) {
				element.budgets.forEach((budget: { title: string; id: string }) => {
					if (budget.title === month) {
						id = budget.id;
					}
				});
			}
		}
	);

	if (id === '') {
		// getting the budget with the latest date
		id =
			data.budgets[data.budgets.length - 1].budgets[
				data.budgets[data.budgets.length - 1].budgets.length - 1
			].id;
	}

	return id;
};
