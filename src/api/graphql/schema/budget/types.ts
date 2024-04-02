export const BudgetTypes = `
scalar DateTime

type Budget {
	id: ID!
	title: String!
	description: String
	startDate: DateTime!
	endDate: DateTime!
	createdAt: DateTime
	updatedAt: DateTime
	incomes: BudgetIncomeData
	expenses(categoryType: CategoryType): [CategoryExpenseGroup]
}

type BudgetIncomeData {
	incomes: [Income]
	totalSum: Int
}

type CategoryExpenseGroup {
	category: CategoryType
	totalSum: Int
	expensesByCategory: [Expense]
}

type BudgetByYear {
	year: Int!
	budgets: [Budget]!
}

type Query {
	budget(id: ID!): Budget
	budgets: [BudgetByYear]
}

input BudgetCreateDataInput {
	title: String!
	description: String
	startDate: DateTime!
	endDate: DateTime!
}

type Mutation {
	budgetCreate(data: BudgetCreateDataInput!): Budget
}

`;
