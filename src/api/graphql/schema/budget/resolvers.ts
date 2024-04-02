import prisma from '@/api/prisma/db';

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
				`Failed to fetch incomes for budget with ID: ${parent.id}`
			);
		}
	},
	expenses: async (parent: any) => {
		try {
			// Retrieve expenses associated with the budget
			const expense = await prisma.expense.findMany({
				where: {
					budgets: {
						some: {
							id: parent.id,
						},
					},
				},
			});
			return expense;
		} catch (error) {
			throw new Error(
				`Failed to fetch incomes for budget with ID: ${parent.id}`
			);
		}
	},
};
