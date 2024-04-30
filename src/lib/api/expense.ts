import { revalidateTag } from 'next/cache';
import { getClient } from '../apolloClient';
import gql from 'graphql-tag';
import { CategoryType } from '@/context/budgetIdContext';

const ADD_EXPENSE = gql`
	mutation ExpenseCreate($data: ExpenseCreateDataInput!) {
		expenseCreate(data: $data) {
			title
			amount
		}
	}
`;

const GET_CATEGORIES = gql`
	query CategoryTypes {
		expenseCategoryTypes
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
