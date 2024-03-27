import prisma from "@/graphql/db";

export const BudgetQuery = {
  budgets: () => {
    return prisma.budget.findMany({});
  },
  budget: (_: any, args: { id: string }) => {
    return prisma.budget.findFirst({
      where: { id: args.id },
    });
  },
};