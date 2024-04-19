import { fetchBudgetArray, fetchYearData } from '@/lib/api';
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

	const validationArray = await fetchBudgetArray();
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

		validationArray.map((item: { year: string; title: string }) => {
			if (
				Number(item.year) === Number(extractYear(endDateStr)) &&
				item.title.toUpperCase() === formData.budgetTitle.toUpperCase()
			) {
				console.log('tast');
				currentState.budgetName = {
					id: 'budgetName',
					hasError: true,
					notUnique: true,
				};
				return;
			}
		});
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
