import { gql } from '@apollo/client';

export const ADD_EXPENSE = gql`
	mutation ExpenseCreate($data: ExpenseCreateDataInput!) {
		expenseCreate(data: $data) {
			title
			amount
		}
	}
`;

export const EDIT_EXPENSE = gql`
	mutation ExpenseUpdate(
		$data: ExpenseUpdateDataInput!
		$expenseUpdateId: ID!
	) {
		expenseUpdate(data: $data, id: $expenseUpdateId) {
			title
			amount
			id
		}
	}
`;

export const GET_CATEGORIES = gql`
	query CategoryTypes {
		expenseCategoryTypes
	}
`;

export const DELETE_EXPENSE = gql`
	mutation ExpenseDelete($expenseDeleteId: ID!, $budgetId: String!) {
		expenseDelete(id: $expenseDeleteId, budgetID: $budgetId)
	}
`;

export const GET_EXPENSE_DETAILS = gql`
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
