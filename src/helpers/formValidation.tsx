import { fetchMonthData } from '@/lib/api/budget';
import { extractYear, isValidDate } from './date';

export const createBudgetValidation = async (
	currentState: any,
	formData: any
) => {
	currentState = {
		budgetName: { id: '', hasError: false },
		budgetDates: { id: '', hasError: false },
	};

	const validDates: { startDate: string | Date; endDate: string | Date } = {
		startDate: '',
		endDate: '',
	};
	const [startDateStr, endDateStr] = formData.budgetDates
		.toString()
		.split(' - ');

	validDates.startDate = new Date(startDateStr);
	validDates.endDate = new Date(endDateStr);

	const validationBudgets = await fetchMonthData(extractYear(endDateStr));

	if (formData.budgetTitle !== null) {
		if (
			formData.budgetTitle.toString().length < 3 ||
			formData.budgetTitle.toString().length > 16
		) {
			currentState.budgetName = {
				id: 'budgetName',
				hasError: true,
				notUnique: false,
			};
		} else {
			currentState.budgetName = {
				id: 'budgetName',
				hasError: false,
				notUnique: false,
			};
		}
		if (validationBudgets && validationBudgets.length > 0) {
			validationBudgets.map((item: { value: string; caption: string }) => {
				if (item.value.toUpperCase() === formData.budgetTitle.toUpperCase()) {
					currentState.budgetName = {
						id: 'budgetName',
						hasError: true,
						notUnique: true,
					};
					return;
				}
			});
		}
	}

	if (!isValidDate(startDateStr) || !isValidDate(endDateStr)) {
		currentState.budgetDates = {
			id: 'budgetDates',
			hasError: true,
		};
	} else {
		currentState.budgetDates = {
			id: 'budgetDates',
			hasError: false,
		};
	}

	return currentState;
};

export const addIncomeValidation = (currentState: any, formData: any) => {
	if (formData.incomeType !== null) {
		if (formData.incomeType.length < 3 || formData.incomeType.length > 16) {
			currentState.incomeType.hasError = true;
		} else {
			currentState.incomeType = {
				hasError: false,
			};
		}
	}
	return currentState;
};
