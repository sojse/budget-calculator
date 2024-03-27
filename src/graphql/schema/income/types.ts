export const IncomeTypes = `
scalar DateTime

type Income {
	id: ID!
	title: String!
	amount: Int!
	createdAt: DateTime
	updatedAt: DateTime
	monthlyIncome: Boolean
}
`;
input IncomeCreateDataInput {
	title: String!
	amount: Int!
	monthlyIncome: Boolean!
    budgetID: String!
}
type Mutation {
	incomeCreate(data: IncomeCreateDataInput!): Income
    incomeUpdate(id: ID, data: IncomeUpdateDataInput!): Income
    incomeDelete(id: ID!): String
}
`;