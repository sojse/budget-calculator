'use server';
import { createBudgetValidation } from '@/helpers/formValidation';
import { createBudget, fetchMonthData } from '@/lib/api';

export async function getMonthData(year: string) {
	return await fetchMonthData(year);
}

export async function submitNewBudget(currentState: any, formData: FormData) {
	const rawFormData = {
		budgetTitle: formData.get('budgetName'),
		description: formData.get('budgetDescription'),
		budgetDates: formData.get('budgetDates'),
	};

	const inValidForm = await createBudgetValidation(currentState, rawFormData);

	if (inValidForm.budgetName.hasError || inValidForm.budgetName.hasError) {
		return inValidForm;
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

	const status = createBudget(validAndFilteredData);
	return status;
}