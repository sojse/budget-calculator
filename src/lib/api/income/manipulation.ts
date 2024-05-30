import { getClient } from '@/lib/apolloClient';
import { ADD_INCOME, DELETE_INCOME, EDIT_INCOME } from './graphql';

export const createIncome = async (incomeData: any, id: string) => {
	const client = getClient();
	try {
		await client.mutate({
			variables: {
				data: {
					budgetID: id,
					monthlyTransaction: incomeData.monthlyTransaction ? true : false,
					title: incomeData.incomeType,
					amount: Number(incomeData.incomeAmount),
				},
			},
			mutation: ADD_INCOME,
		});

		return { success: true };
	} catch (error) {
		console.error('An error occured', error);
		return { error: true };
	}
};

export const updateIncome = async (
	incomeData: any,
	budgetId: string,
	incomeId: string
) => {
	const client = getClient();
	try {
		await client.mutate({
			variables: {
				data: {
					budgetID: budgetId,
					monthlyTransaction: incomeData.monthlyTransaction ? true : false,
					title: incomeData.incomeType,
					amount: Number(incomeData.incomeAmount),
				},
				incomeUpdateId: incomeId,
			},
			mutation: EDIT_INCOME,
		});

		return { success: true };
	} catch (error) {
		console.error('An error occured', error);
		return { error: true };
	}
};

export const deleteIncomeById = async (budgetId: string, incomeId: string) => {
	const client = getClient();
	try {
		await client.mutate({
			variables: {
				budgetId: budgetId,
				incomeDeleteId: incomeId,
			},
			mutation: DELETE_INCOME,
		});

		return { success: true };
	} catch (error) {
		console.error('An error occured', error);
		return { error: true };
	}
};
