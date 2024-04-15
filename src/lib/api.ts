import gql from 'graphql-tag';
import client from '@/lib/apolloClient';

export interface GraphQLResponse {
	budgets: {
		year: number;
		budgets: { title: string }[];
	}[];
}

const responseBody = {
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

export const fetchYearData = async () => {
	const { data } = await client.query(responseBody);

	const { budgets } = data;
	const latestYearBudgets = budgets[budgets.length - 1].budgets;

	const years = budgets
		.map((item: any) => ({
			value: `${item.year}`,
			caption: `${item.year}`,
		}))
		.reverse();
	const months = latestYearBudgets.map((budget: any) => ({
		value: budget.title,
		caption: budget.title,
	}));

	const selected = {
		monthIndex: months.length - 1,
		yearIndex: 0,
	};

	const budgetInformation = {
		years,
		months,
		selected,
	};

	return budgetInformation;
};

export const fetchMonthData = async (year: string) => {
	const { data } = await client.query(responseBody);

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
