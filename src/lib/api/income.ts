import gql from 'graphql-tag';
import { getClient } from '../apolloClient';
import { revalidateTag } from 'next/cache';

const EDIT_INCOME = gql`
	mutation IncomeUpdate($data: IncomeUpdateDataInput!, $incomeUpdateId: ID) {
		incomeUpdate(data: $data, id: $incomeUpdateId) {
			title
			amount
			id
		}
	}
`;

const ADD_INCOME = gql`
	mutation IncomeCreate($data: IncomeCreateDataInput!) {
		incomeCreate(data: $data) {
			title
			amount
		}
	}
`;

const DELETE_INCOME = gql`
	mutation IncomeDelete($incomeDeleteId: ID!, $budgetId: String!) {
		incomeDelete(id: $incomeDeleteId, budgetID: $budgetId)
	}
`;

export const createIncome = async (incomeData: any, id: string) => {
	const client = getClient();
	try {
		const { data } = await client.mutate({
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
		revalidateTag('budget');

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
		const { data } = await client.mutate({
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

		revalidateTag('budget');

		return { success: true };
	} catch (error) {
		console.error('An error occured', error);
		return { error: true };
	}
};

export const deleteIncomeById = async (budgetId: string, incomeId: string) => {
	const client = getClient();
	try {
		const { data } = await client.mutate({
			variables: {
				budgetId: budgetId,
				incomeDeleteId: incomeId,
			},
			mutation: DELETE_INCOME,
		});

		revalidateTag('budget');

		return { success: true };
	} catch (error) {
		console.error('An error occured', error);
		return { error: true };
	}
};
