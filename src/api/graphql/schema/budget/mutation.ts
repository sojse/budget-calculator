import prisma from '@/api/prisma/db';

type BudgetCreateInput = {
	data: {
		title: string;
		description: string;
		startDate: Date;
		endDate: Date;
	};
};

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
			include: { incomes: true, expenses: true },
		});

		const monthlyIncomes = await prisma.income.findMany({
			where: { monthlyTransaction: true },
		});

		const monthlyExpenses = await prisma.expense.findMany({
			where: { monthlyTransaction: true },
		});

		await prisma.budget.update({
			where: { id: newBudget.id },
			data: {
				incomes: {
					connect: monthlyIncomes.map((income) => ({ id: income.id })),
				},
				expenses: {
					connect: monthlyExpenses.map((expense) => ({ id: expense.id })),
				},
			},
		});

		return newBudget;
	},
};