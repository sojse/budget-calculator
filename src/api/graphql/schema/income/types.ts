export const IncomeTypes = `
scalar DateTime

type Income {
	id: ID!
	title: String!
	amount: Int!
	createdAt: DateTime
	updatedAt: DateTime
	monthlyTransaction: Boolean
}

input IncomeCreateDataInput {
	title: String!
	amount: Int!
	monthlyTransaction: Boolean!
    budgetID: String!
}

input IncomeUpdateDataInput {
	title: String
	amount: Int
	monthlyTransaction: Boolean
    budgetID: String!
}

type Mutation {
	incomeCreate(data: IncomeCreateDataInput!): Income
    incomeUpdate(id: ID, data: IncomeUpdateDataInput!): Income
    incomeDelete(id: ID!, budgetID: String!): String
}
`;