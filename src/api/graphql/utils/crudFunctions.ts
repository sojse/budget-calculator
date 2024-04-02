import prisma from '@/api/prisma/db';
import { PrismaClient } from '@prisma/client/extension';

// Maps the entity types to their corresponding Prisma client method
const tableMap: Record<
	'income' | 'expense',
	PrismaClient['income' | 'expense']
> = {
	income: prisma.income,
	expense: prisma.expense,
};

export async function createEntity(entity: 'expense' | 'income', data: any) {
	console.log(data);
	return tableMap[entity].create({ data });
}

export async function deleteTransactionData(
	entity: 'income' | 'expense',
	id: string,
	budgetID: string
) {
	const item = await tableMap[entity].findUnique({
		where: { id },
		include: { budgets: true },
	});

	if (!item) {
		throw new Error(`Expense with ID ${id} not found`);
	}

	const numberOfBudgets = item.budgets.length;

	if (numberOfBudgets > 1) {
		// The item is connected to multiple budgets, so just disconnect it from the current budget
		await tableMap[entity].update({
			where: { id },
			data: {
				budgets: { disconnect: { id: budgetID } },
			},
		});
	} else {
		// The item is connected to only one budget, so delete it
		await tableMap[entity].delete({
			where: { id },
		});
	}

	return `${item.title} was deleted successfully`;
}

export async function updateTransactionData(
	entity: 'income' | 'expense',
	id: string,
	data: any
) {
	const existingItem = await tableMap[entity].findUnique({
		where: { id },
		include: { budgets: true },
	});

	if (!existingItem) {
		throw new Error(`${entity} with ID ${id} not found`);
	}

	const isNewMonthlyTransaction = data.monthlyTransaction === true;

	const isMonthlyTransaction = existingItem?.monthlyTransaction ?? false;

	const updatedData: any = {
		title: data.title ?? existingItem?.title,
		amount: data.amount ?? existingItem?.amount,
		monthlyTransaction:
			data.monthlyTransaction ?? existingItem?.monthlyTransaction,
	};

	if (entity === 'expense') {
		updatedData.categoryType = data.categoryType ?? existingItem?.categoryType;
	}

	if (isMonthlyTransaction && !isNewMonthlyTransaction) {
		await tableMap[entity].update({
			where: { id },
			data: {
				budgets: { disconnect: { id: data.budgetID } },
			},
		});

		const newExpense = await tableMap[entity].create({
			data: {
				...updatedData,
				budgets: { connect: { id: data.budgetID } },
			},
		});

		return newExpense;
	} else if (isMonthlyTransaction && isNewMonthlyTransaction) {
		const oldData = existingItem;
		oldData.monthlyTransaction = false;

		await tableMap[entity].update({
			where: { id },
			data: {
				...oldData,
				budgets: { disconnect: { id: data.budgetID } },
			},
		});

		const newExpense = await tableMap[entity].create({
			data: {
				...updatedData,
				budgets: { connect: { id: data.budgetID } },
			},
		});

		return newExpense;
	} else {
		const updatedExpense = await tableMap[entity].upsert({
			where: { id },
			update: {
				...updatedData,
			},
			create: {
				...updatedData,
				budgets: data.budgetID ? { connect: { id: data.budgetID } } : undefined,
			},
		});
		return updatedExpense;
	}
}
