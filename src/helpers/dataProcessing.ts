import { Expense, Income } from '@/context/budgetIdContext';

export const processSelectData = (data: { budgets: any }, year: string) => {
	const { budgets } = data;

	let selectedBudgets = [];
	if (year === '') {
		selectedBudgets = budgets[budgets.length - 1].budgets;
	} else {
		const filteredBudgets = budgets.filter(
			(item: any) => item.year.toString() === year
		);
		selectedBudgets = filteredBudgets[0].budgets;
	}

	const years = budgets.map((item: any, index: number) => ({
		value: `${item.year}`,
		caption: `${item.year}`,
	}));
	const months = selectedBudgets.map((budget: any, index: number) => ({
		value: budget.title.toLowerCase(),
		caption: budget.title,
	}));

	return { years, months };
};

export const processMonthData = (data: { budgets: any }, year: string) => {
	const { budgets } = data;

	const matchingYearBudgets = budgets.find(
		(item: any) => item.year === parseInt(year, 10)
	);

	if (!matchingYearBudgets) {
		return [];
	}

	const months = matchingYearBudgets.budgets.map(
		(budget: any, index: number) => ({
			value: budget.title,
			caption: budget.title,
		})
	);

	return months;
};

export const processOverviewData = (data: { budgets: any }) => {
	const { budgets } = data;

	const budgetInformation: {
		labels: string[];
		datasets: { label: string; data: number[] }[];
	} = {
		labels: [],
		datasets: [
			{ label: 'Utgifter', data: [] },
			{ label: 'Inkomster', data: [] },
		],
	};

	budgets[0].budgets.forEach(
		(element: {
			title: string;
			expenses: { totalSum: number } | null;
			incomes: { totalSum: number } | null;
		}) => {
			budgetInformation.labels.push(element.title);
			budgetInformation.datasets[0].data.push(
				element.expenses ? element.expenses.totalSum : 0
			);
			budgetInformation.datasets[1].data.push(
				element.incomes ? element.incomes.totalSum : 0
			);
		}
	);

	return budgetInformation;
};

export const processSpendingData = (data: {
	budget: { expenses: { totalSum: number }; incomes: { totalSum: number } };
}) => {
	const expense = data.budget.expenses.totalSum;
	const surplus = data.budget.incomes.totalSum - data.budget.expenses.totalSum;
	let secondValue = surplus;
	if (surplus <= 0) {
		secondValue = 0;
	}

	return {
		chartData: {
			labels: ['Expense', 'Surplus'],
			datasets: [
				{
					label: 'Amount',
					data: [expense, secondValue],
					backgroundColor: [],
				},
			],
		},
		totalAmount: expense,
		income: data.budget.incomes.totalSum,
		surplus,
	};
};

export const processBudgetData = (
	data: {
		budget: {
			incomes: { incomes: any; totalSum: any };
			expenses: { expenses: any; totalSum: any };
		};
	},
	id: string
) => {
	const incomes = data.budget.incomes.incomes;
	const expenses = data.budget.expenses.expenses;

	return {
		budgetId: id,
		incomes: incomes.map((income: Income) => ({
			category: 'income',
			data: {
				title: income.title,
				amount: income.amount,
				monthlyTransaction: income.monthlyTransaction,
				id: income.id,
				categoryType: { category: 'income' },
			},
		})),
		expenses: expenses.map((expense: Expense) => ({
			category: 'expense',
			data: {
				title: expense.title,
				amount: expense.amount,
				monthlyTransaction: expense.monthlyTransaction,
				id: expense.id,
				categoryType: {
					category: expense.categoryType?.toString().toLowerCase(),
				},
			},
		})),
		budgetOverview: [
			data.budget.incomes.totalSum,
			data.budget.expenses.totalSum,
		],
	};
};
