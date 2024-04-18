import { isValidDate } from './date';

export const createBudgetValidation = (currentState: any, formData: any) => {
	currentState = {
		budgetName: { id: '', hasError: false },
		budgetDates: { id: '', hasError: false },
	};

	if (formData.budgetTitle !== null) {
		if (
			formData.budgetTitle.toString().length < 3 ||
			formData.budgetTitle.toString().length > 16
		) {
			currentState.budgetName = {
				id: 'budgetName',
				hasError: true,
			};
		} else {
			currentState.budgetName = {
				id: 'budgetName',
				hasError: false,
			};
		}
	}
	const validDates: { startDate: string | Date; endDate: string | Date } = {
		startDate: '',
		endDate: '',
	};
	const [startDateStr, endDateStr] = formData.budgetDates
		.toString()
		.split(' - ');

	validDates.startDate = new Date(startDateStr);
	validDates.endDate = new Date(endDateStr);

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
