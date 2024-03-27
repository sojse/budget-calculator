import prisma from "@/graphql/db";

type IncomeUpdateInput = {
  id: string;
  data: {
    title?: string;
    amount?: number;
    monthlyIncome?: boolean;
    budgetID: string;
  };
};

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
  incomeUpdate: async (_: any, args: IncomeUpdateInput) => {
    const { id, data } = args;

    const existingIncome = await prisma.income.findUnique({
      where: { id },
      include: { budgets: true },
    });

    const isMonthlyIncome = existingIncome?.monthlyIncome ?? false;
    const isNewMonthlyIncome = data.monthlyIncome === true;

    const updatedData: any = {};
    if (data.title !== undefined) updatedData.title = data.title;
    if (data.amount !== undefined) updatedData.amount = data.amount;
    if (isNewMonthlyIncome !== undefined) {
      updatedData.monthlyIncome = isNewMonthlyIncome;
    }

    if (isMonthlyIncome && !isNewMonthlyIncome) {
      await prisma.income.update({
        where: { id },
        data: {
          budgets: { disconnect: { id: data.budgetID } },
        },
      });

      const newIncome = await prisma.income.create({
        data: {
          title: updatedData.title,
          amount: updatedData.amount,
          monthlyIncome: updatedData.monthlyIncome || false,
          budgets: { connect: { id: data.budgetID } },
        },
      });

      return newIncome;
    } else if (isMonthlyIncome && isNewMonthlyIncome) {
      await prisma.income.update({
        where: { id },
        data: {
          monthlyIncome: false,
          budgets: { disconnect: { id: data.budgetID } },
        },
      });

      const newIncome = await prisma.income.create({
        data: {
          title: updatedData.title,
          amount: updatedData.amount,
          monthlyIncome: updatedData.monthlyIncome || false,
          budgets: { connect: { id: data.budgetID } },
        },
      });

      return newIncome;
    } else {
      const updatedIncome = await prisma.income.upsert({
        where: { id },
        update: {
          ...updatedData,
        },
        create: {
          ...updatedData,
          budgets: data.budgetID
            ? { connect: { id: data.budgetID } }
            : undefined,
        },
      });
      return updatedIncome;
    }
  },
};
