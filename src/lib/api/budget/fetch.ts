import { getClient } from '@/lib/apolloClient';
import { capitalizeFirstLetter } from '@/helpers/string';
import { ChartData } from '@/ui/components';
import {
	GET_BUDGETS,
	GET_BUDGETS_BY_YEAR,
	GET_BUDGET_OVERVIEW,
	SPENDING_OVERVIEW,
	GET_BUDGET,
} from './graphql';
import {
	processBudgetData,
	processMonthData,
	processOverviewData,
	processSelectData,
	processSpendingData,
} from '@/helpers/dataProcessing';

export const fetchBudgets = async (year: string) => {
	const client = getClient();
	try {
		const { data } = await client.query({
			query: GET_BUDGETS,
			context: {
				fetchOptions: {
					next: { tags: ['budget'] },
				},
			},
			errorPolicy: 'all',
		});
		return processSelectData(data, year);
	} catch (error) {
		console.error(`Error fetching budgets for year ${year}:`, error);
	}
};

export const fetchMonthData = async (year: string) => {
	const client = getClient();

	try {
		const { data } = await client.query({
			query: GET_BUDGETS_BY_YEAR,
			variables: { year },
			errorPolicy: 'all',
		});
		return processMonthData(data, year);
	} catch (error) {
		console.error(`Error fetching budgets for year ${year}:`, error);
	}
};

export const getBudgetOverview = async (
	year: string
): Promise<ChartData | undefined> => {
	const client = getClient();

	try {
		const { data } = await client.query({
			query: GET_BUDGET_OVERVIEW,
			variables: { year },
			context: {
				fetchOptions: {
					next: { tags: ['budget'] },
				},
			},
			errorPolicy: 'all',
		});
		return processOverviewData(data);
	} catch (error) {
		console.error(`Error fetching budgets for year ${year}:`, error);
	}
};

export const getSpendingOverview = async (slug: string[]) => {
	const client = getClient();
	const id = await getBudgetId(slug);

	try {
		const { data } = await client.query({
			query: SPENDING_OVERVIEW,
			variables: { budgetId: id },
			context: {
				fetchOptions: {
					next: { tags: ['budget'] },
				},
			},
			errorPolicy: 'all',
		});
		return processSpendingData(data);
	} catch (error) {
		console.error(`Error fetching budget`, error);
	}
};

export const fetchBudget = async (slug: string[]) => {
	const client = getClient();
	const id = await getBudgetId(slug);
	try {
		const { data } = await client.query({
			query: GET_BUDGET,
			variables: { budgetId: id },
			context: {
				fetchOptions: {
					next: { tags: ['budget'] },
				},
			},
			errorPolicy: 'all',
		});
		return processBudgetData(data, id);
	} catch (error) {
		console.error(`Error fetching budget with id ${id}:`, error);
	}
};

export const getBudgetId = async (slug: string[]) => {
	const year = slug ? slug[1] : '';
	const month = slug ? capitalizeFirstLetter(slug[0]) : '';
	const client = getClient();
	const { data } = await client.query({ query: GET_BUDGETS });
	let id = '';

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
		id =
			data.budgets[data.budgets.length - 1].budgets[
				data.budgets[data.budgets.length - 1].budgets.length - 1
			].id;
	}

	return id;
};
