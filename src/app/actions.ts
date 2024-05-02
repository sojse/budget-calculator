'use server';
import {
	addExpenseValidation,
	addIncomeValidation,
	createBudgetValidation,
} from '@/helpers/formValidation';
import { createBudget, fetchMonthData } from '@/lib/api/budget';
import { createNewExpense, deleteExpenseById } from '@/lib/api/expense';
import { createIncome, deleteIncomeById, updateIncome } from '@/lib/api/income';

import { DeleteState } from '@/ui/components/3-organisms/Forms/DeleteForm/DeleteForm';
import { ExpenseState } from '@/ui/components/3-organisms/Forms/ExpenseForm';
import { State } from '@/ui/components/3-organisms/Forms/IncomeForm';

export async function getMonthData(year: string) {
	return await fetchMonthData(year);
}

export async function submitNewBudget(currentState: any, formData: FormData) {
	const rawFormData = {
		budgetTitle: formData.get('budgetName'),
		description: formData.get('budgetDescription'),
		budgetDates: formData.get('budgetDates'),
	};

	const validatedForm = await createBudgetValidation(currentState, rawFormData);

	if (validatedForm.budgetDates.hasError || validatedForm.budgetName.hasError) {
		return validatedForm;
	}

	const validAndFilteredData = {
		budgetTitle: rawFormData.budgetTitle,
		description: rawFormData.description,
		startDate: '',
		endDate: '',
	};

	if (rawFormData.budgetDates !== null) {
		const [startDateStr, endDateStr] = rawFormData.budgetDates
			.toString()
			.split(' - ');
		validAndFilteredData.startDate = new Date(startDateStr).toISOString();
		validAndFilteredData.endDate = new Date(endDateStr).toISOString();
	}

	const status = await createBudget(validAndFilteredData);

	return status;
}

export async function addNewIncome(currentState: State, formData: FormData) {
	const rawFormData = Object.fromEntries(formData);
	const newState = addIncomeValidation(currentState, rawFormData);

	if (newState.incomeType.hasError) {
		return newState;
	}

	const finishState = await createIncome(rawFormData, currentState.budgetId);
	return finishState;
}

export async function editIncome(currentState: State, formData: FormData) {
	const rawFormData = Object.fromEntries(formData);
	const newState = addIncomeValidation(currentState, rawFormData);

	if (newState.incomeType.hasError) {
		return newState;
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
	const rawFormData = Object.fromEntries(formData);
	const newState = addExpenseValidation(currentState, rawFormData);
	if (newState.categoryType.hasError) {
		return newState;
	}

	const finishState = await createNewExpense(
		rawFormData,
		currentState.budgetId
	);
	return finishState;
}