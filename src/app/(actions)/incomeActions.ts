'use server';
import { addIncomeValidation } from '@/helpers/formValidation';
import {
	createIncome,
	updateIncome,
	deleteIncomeById,
} from '@/lib/api/income/manipulation';
import { DeleteState } from '@/ui/components/3-organisms/Forms/DeleteForm/DeleteForm';
import { IncomeState } from '@/ui/components/3-organisms/Forms/IncomeForm';
import { revalidateTag } from 'next/cache';

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
	revalidateTag('budget');
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

		revalidateTag('budget');

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
		revalidateTag('budget');

		return finishState;
	}

	const errorState = currentState;
	errorState.error = true;
	return errorState;
}
