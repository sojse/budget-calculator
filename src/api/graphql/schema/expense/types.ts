export const ExpenseTypes = `
scalar DateTime

type Expense {
	id: ID!
	title: String!
	amount: Int!
	createdAt: DateTime
	updatedAt: DateTime
	categoryType: CategoryType
	monthlyTransaction: Boolean
}

enum CategoryType {
	ENTERTAINMENT
	HOME
	SAVINGS
	SHOPPING
	TRANSPORTATION
	OTHER
}

input ExpenseCreateDataInput {
	title: String!
	amount: Int!
	monthlyTransaction: Boolean!
	categoryType: CategoryType!
    budgetID: String!
}

input ExpenseUpdateDataInput {
	title: String
	amount: Int
	monthlyTransaction: Boolean
	categoryType: CategoryType
    budgetID: String!
}

type Mutation {
	expenseCreate(data: ExpenseCreateDataInput!): Expense
    expenseUpdate(id: ID!, data: ExpenseUpdateDataInput!): Expense
    expenseDelete(id: ID!, budgetID: String!): String
}
`;
