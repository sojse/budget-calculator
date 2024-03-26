import gql from "graphql-tag";
import { BudgetMutation, BudgetQuery, BudgetTypes } from "./budget";
import { ExpenseTypes } from "./expense";
import { IncomeTypes } from "./income";

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
  },
};
