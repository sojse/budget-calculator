import prisma from '@/api/prisma/db';

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
	incomeDelete: async (_: any, args: { id: string }) => {
		const { id } = args;

		const income = await prisma.income.findUnique({
			where: { id },
			include: { budgets: true },
		});

		if (!income) {
			throw new Error(`Income with ID ${id} not found`);
		}

		const numberOfBudgets = income.budgets.length;

		if (numberOfBudgets > 1) {
			// The income is connected to multiple budgets, so just disconnect it from the current budget
			await prisma.income.update({
				where: { id },
				data: {
					budgets: { disconnect: { id: income.budgets[0].id } },
				},
			});
		} else {
			// The income is connected to only one budget, so delete it
			await prisma.income.delete({
				where: { id },
			});
		}

		return `${income.title} was deleted successfully`;
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
