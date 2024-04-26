'use server';
import {
	addIncomeValidation,
	createBudgetValidation,
} from '@/helpers/formValidation';
import { createBudget, createIncome, fetchMonthData } from '@/lib/api';

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

export async function addNewIncome(
	currentState: {
		incomeType: { hasError: boolean };
		success: boolean;
		error: boolean;
		id: string;
	},
	formData: FormData
) {
	const rawFormData = Object.fromEntries(formData);
	const newState = addIncomeValidation(currentState, rawFormData);

	if (newState.incomeType.hasError) {
		return newState;
	}

	const finishState = await createIncome(rawFormData, currentState.id);
	return finishState;
}