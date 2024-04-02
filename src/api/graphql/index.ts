import gql from 'graphql-tag';
import {
	BudgetMutation,
	BudgetQuery,
	BudgetResolvers,
	BudgetTypes,
} from './schema/budget';
import { ExpenseTypes } from './schema/expense';
import { IncomeMutation, IncomeTypes } from './schema/income';
import { ExpenseMutation } from './schema/expense/mutation';

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
	},
	Mutation: {
		...BudgetMutation,
		...ExpenseMutation,
		...IncomeMutation,
	},
	Budget: BudgetResolvers,
	//CategoryType: ExpenseResolver.CategoryType,
};
