'use server';
import { getDateRange } from '@/helpers/date';
import {
	addExpenseValidation,
	addIncomeValidation,
	createBudgetValidation,
} from '@/helpers/formValidation';
import { fetchMonthData } from '@/lib/api/budget/fetch';
import { Budget, createBudget } from '@/lib/api/budget/manipulations';
import {
	deleteExpenseById,
	createNewExpense,
	updateExpense,
} from '@/lib/api/expense/manipulation';
import {
	createIncome,
	updateIncome,
	deleteIncomeById,
} from '@/lib/api/income/manipulation';
import { BudgetState } from '@/ui/components';
import { DeleteState } from '@/ui/components/3-organisms/Forms/DeleteForm/DeleteForm';
import { ExpenseState } from '@/ui/components/3-organisms/Forms/ExpenseForm';
import { IncomeState } from '@/ui/components/3-organisms/Forms/IncomeForm';

export async function submitNewBudget(
	currentState: BudgetState,
	formData: FormData
) {
	const rawFormData = {
		budgetTitle: formData.get('budgetName') as string,
		description: formData.get('budgetDescription') as string,
		budgetDates: formData.get('budgetDates') as string,
	};

	const validatedForm = await createBudgetValidation(currentState, rawFormData);

	if (validatedForm.budgetDates.hasError || validatedForm.budgetName.hasError) {
		return validatedForm;
	}

	const { startDate, endDate } = getDateRange(rawFormData.budgetDates);
	const validAndFilteredData = {
		title: rawFormData.budgetTitle,
		description: rawFormData.description,
		startDate,
		endDate,
	};

	const finishState = await createBudget(validAndFilteredData);

	return finishState;
}

export async function addNewIncome(
	currentState: IncomeState,
	formData: FormData
) {
	const rawFormData = {
		incomeType: formData.get('incomeType') as string,
		incomeAmount: formData.get('incomeAmount') as string,
		monthlyTransaction: formData.get('monthlyTransaction') as string,
	};

	const validatedForm = addIncomeValidation(currentState, rawFormData);

	if (validatedForm.incomeType.hasError) {
		return validatedForm;
	}

	const finishState = await createIncome(rawFormData, currentState.budgetId);
	return finishState;
}

export async function editIncome(
	currentState: IncomeState,
	formData: FormData
) {
	const rawFormData = {
		incomeType: formData.get('incomeType') as string,
		incomeAmount: formData.get('incomeAmount') as string,
		monthlyTransaction: formData.get('monthlyTransaction') as string,
	};

	const validatedForm = addIncomeValidation(currentState, rawFormData);

	if (validatedForm.incomeType.hasError) {
		return validatedForm;
	}

	if (currentState.incomeId) {
		const finishState = await updateIncome(
			rawFormData,
			currentState.budgetId,
			currentState.incomeId
		);
		return finishState;
	}

	const errorState = currentState;
	errorState.error = true;
	return errorState;
}

export async function deleteIncome(currentState: DeleteState, _: FormData) {
	if (currentState.dataId) {
		const finishState = await deleteIncomeById(
			currentState.budgetId,
			currentState.dataId
		);
		return finishState;
	}

	const errorState = currentState;
	errorState.error = true;
	return errorState;
}

export async function deleteExpense(currentState: DeleteState, _: FormData) {
	if (currentState.dataId) {
		const finishState = await deleteExpenseById(
			currentState.budgetId,
			currentState.dataId
		);
		return finishState;
	}

	const errorState = currentState;
	errorState.error = true;
	return errorState;
}

export async function createExpense(
	currentState: ExpenseState,
	formData: FormData
) {
	const rawFormData = {
		expenseType: formData.get('expenseType') as string,
		expenseAmount: formData.get('expenseAmount') as string,
		monthlyTransaction: formData.get('monthlyTransaction') as string,
		categoryType: formData.get('categoryType') as string,
	};

	const validatedForm = addExpenseValidation(currentState, rawFormData);
	if (validatedForm.expenseType.hasError) {
		return validatedForm;
	}

	const finishState = await createNewExpense(
		rawFormData,
		currentState.budgetId
	);
	return finishState;
}

export async function editExpense(
	currentState: ExpenseState,
	formData: FormData
) {
	const rawFormData = {
		expenseType: formData.get('expenseType') as string,
		expenseAmount: formData.get('expenseAmount') as string,
		monthlyTransaction: formData.get('monthlyTransaction') as string,
		categoryType: formData.get('categoryType') as string,
	};
	const validatedForm = addExpenseValidation(currentState, rawFormData);

	if (validatedForm.expenseType.hasError) {
		return validatedForm;
	}

	if (currentState.expenseId) {
		const finishState = await updateExpense(
			rawFormData,
			currentState.budgetId,
			currentState.expenseId
		);
		return finishState;
	}

	const errorState = currentState;
	errorState.error = true;
	return errorState;
}

export async function getMonthData(year: string) {
	return await fetchMonthData(year);
}