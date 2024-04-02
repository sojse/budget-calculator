import prisma from '@/api/prisma/db';
import { CategoryType } from '@prisma/client';

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

			const totalSum = incomes.reduce(
				(acc: number, income: any) => acc + income.amount,
				0
			);

			return {
				incomes,
				totalSum,
			};
		} catch (error) {
			throw new Error(
				`Failed to fetch incomes for budget with ID: ${parent.id}`
			);
		}
	},
	expenses: async (
		parent: any,
		args: { categoryType: CategoryType | undefined }
	) => {
		try {
			let expense;

			if (args.categoryType !== undefined) {
				expense = await prisma.expense.findMany({
					where: {
						budgets: {
							some: {
								id: parent.id,
							},
						},
						categoryType: args.categoryType,
					},
				});
			} else {
				expense = await prisma.expense.findMany({
					where: {
						budgets: {
							some: {
								id: parent.id,
							},
						},
					},
				});
			}

			// Group expenses by categoryType and calculate total amount for each group
			const groupedExpenses = expense.reduce((groups: any, expense: any) => {
				const category = expense.categoryType;
				if (!groups[category]) {
					groups[category] = {
						category,
						totalSum: 0,
						expensesByCategory: [],
					};
				}
				groups[category].totalSum += expense.amount;
				groups[category].expensesByCategory.push(expense);
				return groups;
			}, {});

			// Convert groupedExpenses object to array of grouped expenses
			const groupedExpenseArray = Object.values(groupedExpenses);

			return groupedExpenseArray;
		} catch (error) {
			throw new Error(
				`Failed to fetch expenses for budget with ID: ${parent.id}`
			);
		}
	},
};
