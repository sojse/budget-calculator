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
