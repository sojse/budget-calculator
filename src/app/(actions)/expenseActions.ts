'use server';
import { addExpenseValidation } from '@/helpers/formValidation';
import {
	deleteExpenseById,
	createNewExpense,
	updateExpense,
} from '@/lib/api/expense/manipulation';

import { DeleteState } from '@/ui/components/3-organisms/Forms/DeleteForm/DeleteForm';
import { ExpenseState } from '@/ui/components/3-organisms/Forms/ExpenseForm';
import { revalidateTag } from 'next/cache';

export async function deleteExpense(currentState: DeleteState, _: FormData) {
	if (currentState.dataId) {
		const finishState = await deleteExpenseById(
			currentState.budgetId,
			currentState.dataId
		);

		revalidateTag('budget');
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

	revalidateTag('budget');
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

		revalidateTag('budget');
		return finishState;
	}

	const errorState = currentState;
	errorState.error = true;
	return errorState;
}
