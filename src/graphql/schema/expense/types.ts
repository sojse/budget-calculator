export const ExpenseTypes = `
scalar DateTime

type Expense {
	id: ID!
	title: String!
	amount: Int!
	createdAt: DateTime
	updatedAt: DateTime
	categoryType: CategoryType
	monthlyExpense: Boolean
}

enum CategoryType {
	ENTERTAINMENT
	HOME
	SAVINGS
	SHOPPING
	TRANSPORTATION
	OTHER
}
`;
