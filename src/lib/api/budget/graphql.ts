import { gql } from '@apollo/client';

export const GET_BUDGETS = gql`
	query BudgetsQuery {
		budgets {
			year
			budgets {
				title
				id
				endDate
			}
		}
	}
`;

export const GET_BUDGETS_BY_YEAR = gql`
	query BudgetsQuery($year: String!) {
		budgets(year: $year) {
			year
			budgets {
				title
				id
			}
		}
	}
`;

export const GET_BUDGET_OVERVIEW = gql`
	query BudgetsQuery($year: String!) {
		budgets(year: $year) {
			year
			budgets {
				title
				id
				expenses {
					totalSum
				}
				incomes {
					totalSum
				}
			}
		}
	}
`;

export const SPENDING_OVERVIEW = gql`
	query BudgetQuery($budgetId: ID!) {
		budget(id: $budgetId) {
			incomes {
				totalSum
			}
			expenses {
				totalSum
			}
		}
	}
`;

export const GET_BUDGET = gql`
	query BudgetQuery($budgetId: ID!) {
		budget(id: $budgetId) {
			id
			title
			incomes {
				totalSum
				incomes {
					title
					amount
					id
					monthlyTransaction
				}
			}
			expenses {
				totalSum
				expenses {
					title
					amount
					id
					monthlyTransaction
					categoryType
				}
			}
		}
	}
`;

export const CREATE_BUDGET = gql`
	mutation BudgetCreate($data: BudgetCreateDataInput!) {
		budgetCreate(data: $data) {
			description
			endDate
			startDate
			title
		}
	}
`;
