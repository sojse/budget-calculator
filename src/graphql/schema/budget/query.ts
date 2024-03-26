import prisma from "@/graphql/db";

export const BudgetQuery = {
  budget: (_: any, args: { id: string }) => {
    return prisma.budget.findFirst({
      where: { id: args.id },
    });
  },
};
