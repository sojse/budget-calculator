import { revalidateTag } from 'next/cache';
import { getClient } from '../apolloClient';
import gql from 'graphql-tag';

const ADD_EXPENSE = gql`
	mutation ExpenseCreate($data: ExpenseCreateDataInput!) {
		expenseCreate(data: $data) {
			title
			amount
		}
	}
`;

const EDIT_EXPENSE = gql`
	mutation ExpenseUpdate($data: ExpenseUpdateDataInput!, $expenseUpdateId: ID) {
		expenseUpdate(data: $data, id: $expenseUpdateId) {
			title
			amount
			id
		}
	}
`;

const GET_CATEGORIES = gql`
	query CategoryTypes {
		expenseCategoryTypes
	}
`;

const DELETE_EXPENSE = gql`
	mutation ExpenseDelete($expenseDeleteId: ID!, $budgetId: String!) {
		expenseDelete(id: $expenseDeleteId, budgetID: $budgetId)
	}
`;

enum ExpenseCategoryType {
	ENTERTAINMENT = 'ENTERTAINMENT',
	HOME = 'HOME',
	SAVINGS = 'SAVINGS',
	SHOPPING = 'SHOPPING',
	TRANSPORTATION = 'TRANSPORTATION',
	OTHER = 'OTHER',
}

export const getCategories = async () => {
	const client = getClient();
	const { data } = await client.query({ query: GET_CATEGORIES });
	const expenseCategoryTypes: string[] = data.expenseCategoryTypes;

	return expenseCategoryTypes;
};

export const createNewExpense = async (expenseData: any, id: string) => {
	const client = getClient();
	try {
		const categoryType = await useMappedCategoryType(
			expenseData.categoryType.toUpperCase()
		);

		const { data } = await client.mutate({
			variables: {
				data: {
					budgetID: id,
					monthlyTransaction: expenseData.monthlyTransaction ? true : false,
					title: expenseData.expenseType,
					amount: Number(expenseData.expenseAmount),
					categoryType: categoryType,
				},
			},
			mutation: ADD_EXPENSE,
		});
		revalidateTag('budget');

		return { success: true };
	} catch (error) {
		console.error('An error occured', error);
		return { error: true };
	}
};

const useMappedCategoryType = async (categoryType: string) => {
	const expenseCategoryTypes = await getCategories();

	return expenseCategoryTypes.includes(categoryType)
		? (categoryType as ExpenseCategoryType)
		: ExpenseCategoryType.OTHER;
};

export const deleteExpenseById = async (
	budgetId: string,
	expenseId: string
) => {
	const client = getClient();
	try {
		const { data } = await client.mutate({
			variables: {
				budgetId: budgetId,
				expenseDeleteId: expenseId,
			},
			mutation: DELETE_EXPENSE,
		});

		revalidateTag('budget');

		return { success: true };
	} catch (error) {
		console.error('An error occured', error);
		return { error: true };
	}
};

export const updateExpense = async (
	expenseData: any,
	budgetId: string,
	incomeId: string
) => {
	const client = getClient();
	try {
		const categoryType = await useMappedCategoryType(
			expenseData.categoryType.toUpperCase()
		);
		const { data } = await client.mutate({
			variables: {
				data: {
					budgetID: budgetId,
					monthlyTransaction: expenseData.monthlyTransaction ? true : false,
					title: expenseData.incomeType,
					amount: Number(expenseData.incomeAmount),
					categoryType: categoryType,
				},
				incomeUpdateId: incomeId,
			},
			mutation: EDIT_EXPENSE,
		});

		revalidateTag('budget');

		return { success: true };
	} catch (error) {
		console.error('An error occured', error);
		return { error: true };
	}
};