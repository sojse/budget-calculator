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
	expenses: [Expense]!
	income: [Income]!
}

type Query {
	budget(id: ID!): Budget
	budgets: [Budget]
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

type Budget {
	incomes: [Income]
	expenses: [Expense]
}
`;
