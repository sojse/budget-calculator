import gql from 'graphql-tag';
import {
	BudgetMutation,
	BudgetQuery,
	BudgetResolvers,
	BudgetTypes,
} from './schema/budget';
import { ExpenseMutation, ExpenseTypes, ExpenseQuery } from './schema/expense';
import { IncomeMutation, IncomeTypes } from './schema/income';

export const typeDefs = gql`
	type Query
	type Mutation
	${BudgetTypes}
	${ExpenseTypes}
	${IncomeTypes}
`;

export const resolvers = {
	Query: {
		...BudgetQuery,
		...ExpenseQuery,
	},
	Mutation: {
		...BudgetMutation,
		...ExpenseMutation,
		...IncomeMutation,
	},
	Budget: BudgetResolvers,
};
