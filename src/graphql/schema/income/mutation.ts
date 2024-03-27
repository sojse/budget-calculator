import prisma from "@/graphql/db";

type IncomeCreateInput = {
  data: {
    title: string;
    amount: number;
    monthlyIncome: boolean;
    budgetID: string;
  };
};

export const IncomeMutation = {
  incomeCreate: (_: any, args: IncomeCreateInput) => {
    const { data } = args;
    return prisma.income.create({
      data: {
        title: data.title,
        amount: data.amount,
        monthlyIncome: data.monthlyIncome || false,
        budgets: { connect: { id: data.budgetID } },
      },
    });
  },
};
