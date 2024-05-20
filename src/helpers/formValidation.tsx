import { fetchMonthData } from '@/lib/api/budget/fetch';
import { extractYear, isValidDate } from './date';
import { IncomeState } from '@/ui/components/3-organisms/Forms/IncomeForm';
import { ExpenseState } from '@/ui/components/3-organisms/Forms/ExpenseForm';
import { BudgetState } from '@/ui/components';

export const addIncomeValidation = (
	currentState: IncomeState,
	formData: { [key: string]: string }
) => {
	if (formData.incomeType !== null) {
		if (formData.incomeType.length < 2 || formData.incomeType.length > 20) {
			currentState.incomeType.hasError = true;
		} else {
			currentState.incomeType.hasError = false;
		}
	}
	return currentState;
};

export const addExpenseValidation = (
	currentState: ExpenseState,
	formData: { [key: string]: string }
) => {
	if (formData.expenseType.length < 2 || formData.expenseType.length > 20) {
		currentState.expenseType.hasError = true;
	} else {
		currentState.expenseType.hasError = false;
	}

	return currentState;
};

export const createBudgetValidation = async (
	currentState: BudgetState,
	formData: { [key: string]: string }
) => {
	const validDates: { startDate: string | Date; endDate: string | Date } = {
		startDate: '',
		endDate: '',
	};
	const [startDateStr, endDateStr] = formData.budgetDates.split(' - ');

	validDates.startDate = new Date(startDateStr);
	validDates.endDate = new Date(endDateStr);

	const validationBudgets = await fetchMonthData(extractYear(endDateStr));

	if (formData.budgetTitle !== null) {
		if (formData.budgetTitle.length < 3 || formData.budgetTitle.length > 16) {
			currentState.budgetName = {
				hasError: true,
				notUnique: false,
			};
		} else {
			currentState.budgetName = {
				hasError: false,
				notUnique: false,
			};
		}
		if (validationBudgets && validationBudgets.length > 0) {
			validationBudgets.map((item: { value: string; caption: string }) => {
				if (item.value.toUpperCase() === formData.budgetTitle.toUpperCase()) {
					currentState.budgetName = {
						hasError: true,
						notUnique: true,
					};
					return;
				}
			});
		}
	}

	if (!isValidDate(startDateStr) || !isValidDate(endDateStr)) {
		currentState.budgetDates.hasError = true;
	} else {
		currentState.budgetDates.hasError = false;
	}

	return currentState;
};

