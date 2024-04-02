import {
	createEntity,
	deleteTransactionData,
	updateTransactionData,
} from '../../utils/crudFunctions';

type IncomeUpdateInput = {
	id: string;
	data: {
		title?: string;
		amount?: number;
		monthlyTransaction?: boolean;
		budgetID: string;
	};
};

type IncomeCreateInput = {
	data: {
		title: string;
		amount: number;
		monthlyTransaction: boolean;
		budgetID: string;
	};
};

export const IncomeMutation = {
	incomeCreate: (_: any, args: IncomeCreateInput) => {
		const { data } = args;
		return createEntity('income', {
			title: data.title,
			amount: data.amount,
			monthlyTransaction: data.monthlyTransaction || false,
			budgets: { connect: { id: data.budgetID } },
		});
	},
	incomeDelete: async (_: any, args: { id: string; budgetID: string }) => {
		const { id, budgetID } = args;

		return deleteTransactionData('income', id, budgetID);
	},
	incomeUpdate: async (_: any, args: IncomeUpdateInput) => {
		const { id, data } = args;

		return updateTransactionData('income', id, data);
	},
};
