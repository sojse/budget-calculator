import gql from 'graphql-tag';
import { getClient } from '@/lib/apolloClient';
import { buildNavigationString, capitalizeFirstLetter } from '@/helpers/string';
import { extractYear } from '@/helpers/date';
import { revalidatePath } from 'next/cache';
import { Income } from '@/context/budgetIdContext';

export interface GraphQLResponse {
	budgets: {
		year: number;
		budgets: { title: string }[];
	}[];
}

const GET_BUDGETS = {
	query: gql`
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
	`,
};

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
				category
				totalSum
				expensesByCategory {
					amount
					title
				}
			}
		}
	}
`;

export const fetchStaticParams = async () => {
	const client = getClient();
	const { data } = await client.query(GET_BUDGETS);

	return data.budgets.flatMap((item: { year: number; budgets: any[] }) =>
		item.budgets.map((budget: { title: string }) => ({
			slug: [budget.title.toLocaleLowerCase(), `${item.year}`],
		}))
	);
};

export const fetchYearData = async () => {
	const client = getClient();
	const { data } = await client.query(GET_BUDGETS);

	const { budgets } = data;
	const latestYearBudgets = budgets[budgets.length - 1].budgets;

	const years = budgets.map((item: any) => ({
		value: `${item.year}`,
		caption: `${item.year}`,
	}));
	const months = latestYearBudgets.map((budget: any) => ({
		value: budget.title,
		caption: budget.title,
	}));

	const selected = {
		monthIndex: months.length - 1,
		yearIndex: years.length - 1,
	};

	const navigationString = buildNavigationString(
		months[selected.monthIndex].caption,
		years[selected.yearIndex].caption
	);

	const budgetInformation = {
		years,
		months,
		selected,
		navigationString,
	};

	return budgetInformation;
};

export const fetchMonthData = async (year: string) => {
	const client = getClient();

	try {
		const { data } = await client.query({
			query: GET_BUDGETS_BY_YEAR,
			variables: { year },
			context: {
				fetchOptions: {
					next: { tags: ['budgets'] },
				},
			},
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

		revalidatePath('/', 'layout');

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

	return {
		budgetId: id,
		incomes: incomes.map((income: Income) => ({
			category: 'income',
			expenseInformation: {
				title: income.title,
				amount: income.amount,
				monthlyTransaction: income.monthlyTransaction,
				id: income.id,
			},
		})),
	};
};

const getBudgetId = async (year: string, month: string) => {
	const client = getClient();
	const { data } = await client.query(GET_BUDGETS);
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
