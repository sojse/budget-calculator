import prisma from "@/graphql/db";

type BudgetCreateInput = {
  data: {
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
  };
};

// TODO - Add functionality to automatically add monthly expenses on create
export const BudgetMutation = {
  budgetCreate: async (_: any, args: BudgetCreateInput) => {
    const { data } = args;

    const newBudget = await prisma.budget.create({
      data: {
        title: data.title,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
      },
      include: { incomes: true },
    });

    const monthlyIncomes = await prisma.income.findMany({
      where: { monthlyIncome: true },
    });

    await prisma.budget.update({
      where: { id: newBudget.id },
      data: {
        incomes: {
          connect: monthlyIncomes.map((income) => ({ id: income.id })),
        },
      },
    });

    return newBudget;
  },
};
