import { CategoryType, Expense } from '@prisma/client';
import {
	createEntity,
	deleteTransactionData,
	updateTransactionData,
} from '../../utils/crudFunctions';

type ExpenseUpdateInput = {
	id: string;
	data: {
		title?: string;
		amount?: number;
		monthlyTransaction?: boolean;
		categoryType?: CategoryType;
		budgetID: string;
	};
};

type ExpenseCreateInput = {
	data: {
		title: string;
		amount: number;
		monthlyTransaction: boolean;
		categoryType: CategoryType;
		budgetID: string;
	};
};

export const ExpenseMutation = {
	expenseCreate: (_: any, args: ExpenseCreateInput) => {
		const { data } = args;
		return createEntity('expense', {
			title: data.title,
			amount: data.amount,
			monthlyTransaction: data.monthlyTransaction || false,
			categoryType: data.categoryType,
			budgets: { connect: { id: data.budgetID } },
		});
	},
	expenseDelete: async (_: any, args: { id: string; budgetID: string }) => {
		const { id, budgetID } = args;

		return deleteTransactionData('expense', id, budgetID);
	},
	expenseUpdate: async (_: any, args: ExpenseUpdateInput) => {
		const { id, data } = args;

		return updateTransactionData('expense', id, data);
	},
};
