import gql from 'graphql-tag';
import client from '@/lib/apolloClient';
import { buildNavigationString } from '@/helpers/string';
import { extractYear } from '@/helpers/date';

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
				}
			}
		}
	`,
};

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

export const fetchYearData = async () => {
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

export const fetchBudgetArray = async () => {
	const { data } = await client.query(GET_BUDGETS);

	const { budgets } = data;
	const budgetArray = budgets.flatMap(
		(item: { budgets: { title: any }[]; year: any }) =>
			item.budgets.map((budget: { title: any }) => ({
				year: item.year,
				title: budget.title,
			}))
	);
	return budgetArray;
};

export const fetchMonthData = async (year: string) => {
	const { data } = await client.query(GET_BUDGETS);

	const { budgets } = data;

	const matchingYearBudgets = budgets.find(
		(item: any) => item.year === parseInt(year, 10)
	);

	if (!matchingYearBudgets) {
		throw new Error(`No budgets found for year ${year}`);
	}

	const months = matchingYearBudgets.budgets.map((budget: any) => ({
		value: budget.title,
		caption: budget.title,
	}));

	return months;
};

export const createBudget = async (budgetData: any) => {
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

		const slug = `${data.budgetCreate.title}/${extractYear(data.budgetCreate.endDate)}`;

		return { success: true, newRoute: `/finances/${slug}` };
	} catch (error) {
		console.error('An error occured', error);
		return { success: false };
	}
};
