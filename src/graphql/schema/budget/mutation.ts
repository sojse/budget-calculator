import prisma from "@/graphql/db";

type BudgetCreateInput = {
  data: {
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
  };
};

// TODO - Add functionality to automatically add monthly expenses and incomes on create
export const BudgetMutation = {
  budgetCreate: (_: any, args: BudgetCreateInput) => {
    const { data } = args;
    return prisma.budget.create({
      data: {
        title: data.title,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
      },
    });
  },
};
