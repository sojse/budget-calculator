import prisma from '@/api/prisma/db';

export const BudgetQuery = {
	budgets: async () => {
		const budgets = await prisma.budget.findMany();

		// Group budgets by year of endDate
		const groupedBudgets: { [year: string]: any[] } = {};
		budgets.forEach((budget) => {
			const year = budget.endDate.getFullYear().toString(); // Extract the year from endDate
			if (!groupedBudgets[year]) {
				groupedBudgets[year] = [];
			}
			groupedBudgets[year].push(budget);
		});

		Object.keys(groupedBudgets).forEach((year) => {
			groupedBudgets[year].sort(
				(a, b) => a.endDate.getTime() - b.endDate.getTime()
			);
		});

		// Convert grouped budgets to array of objects with year and budgets
		const formattedBudgets = Object.keys(groupedBudgets).map((year) => ({
			year: parseInt(year),
			budgets: groupedBudgets[year],
		}));

		return formattedBudgets;
	},
	budget: (_: any, args: { id: string }) => {
		return prisma.budget.findFirst({
			where: { id: args.id },
		});
	},
};