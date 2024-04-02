import gql from 'graphql-tag';
import {
	BudgetMutation,
	BudgetQuery,
	BudgetResolvers,
	BudgetTypes,
} from './schema/budget';
import { ExpenseTypes } from '../../graphql/schema/expense';
import { IncomeMutation, IncomeTypes } from '../../graphql/schema/income';
import { ExpenseResolver } from '../../graphql/schema/expense/resolvers';

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
		...IncomeMutation,
	},
	Budget: BudgetResolvers,
	//CategoryType: ExpenseResolver.CategoryType,
};
