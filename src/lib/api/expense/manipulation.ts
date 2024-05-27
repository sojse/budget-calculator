import { getClient } from '@/lib/apolloClient';
import {
	ADD_EXPENSE,
	DELETE_EXPENSE,
	EDIT_EXPENSE,
	GET_CATEGORIES,
} from './graphql';

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

		await client.mutate({
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
		await client.mutate({
			variables: {
				budgetId: budgetId,
				expenseDeleteId: expenseId,
			},
			mutation: DELETE_EXPENSE,
		});

		return { success: true };
	} catch (error) {
		console.error('An error occured', error);
		return { error: true };
	}
};

export const updateExpense = async (
	expenseData: any,
	budgetId: string,
	expenseId: string
) => {
	const client = getClient();
	try {
		const categoryType = await useMappedCategoryType(
			expenseData.categoryType.toUpperCase()
		);

		await client.mutate({
			variables: {
				data: {
					budgetID: budgetId,
					monthlyTransaction: expenseData.monthlyTransaction ? true : false,
					title: expenseData.expenseType,
					amount: Number(expenseData.expenseAmount),
					categoryType: categoryType,
				},
				expenseUpdateId: expenseId,
			},
			mutation: EDIT_EXPENSE,
		});

		return { success: true };
	} catch (error) {
		console.error('An error occured', error);
		return { error: true };
	}
};
