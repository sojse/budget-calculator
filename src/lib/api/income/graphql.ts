import { gql } from '@apollo/client';

export const EDIT_INCOME = gql`
	mutation IncomeUpdate($data: IncomeUpdateDataInput!, $incomeUpdateId: ID) {
		incomeUpdate(data: $data, id: $incomeUpdateId) {
			title
			amount
			id
		}
	}
`;

export const ADD_INCOME = gql`
	mutation IncomeCreate($data: IncomeCreateDataInput!) {
		incomeCreate(data: $data) {
			title
			amount
		}
	}
`;

export const DELETE_INCOME = gql`
	mutation IncomeDelete($incomeDeleteId: ID!, $budgetId: String!) {
		incomeDelete(id: $incomeDeleteId, budgetID: $budgetId)
	}
`;
