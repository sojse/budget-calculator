'use server';
import { getDateRange } from '@/helpers/date';
import { createBudgetValidation } from '@/helpers/formValidation';
import { fetchMonthData } from '@/lib/api/budget/fetch';
import { createBudget } from '@/lib/api/budget/manipulations';
import { BudgetState } from '@/ui/components';
import { revalidateTag } from 'next/cache';

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
	revalidateTag('budgets');
	return finishState;
}

export async function getMonthData(year: string) {
	return await fetchMonthData(year);
}
