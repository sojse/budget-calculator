/**
 // product/resolvers.js
export const ProductResolvers = {
    // here we only write a resolver for reviews and apollo server will create a default 
    // resolver for other fields.
    reviews: (parent, args) => {
        // whatever
    }
}
 */

import prisma from "@/graphql/db";

// TODO - add resolver when expenses and incomes are added
export const BudgetResolvers = {
  incomes: async (parent: any) => {
    try {
      // Retrieve incomes associated with the budget
      const incomes = await prisma.income.findMany({
        where: {
          budgets: {
            some: {
              id: parent.id,
            },
          },
        },
      });
      return incomes;
    } catch (error) {
      throw new Error(
        `Failed to fetch incomes for budget with ID: ${parent.id}`,
      );
    }
  },
};
