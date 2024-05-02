'use client';
import { useBudgetId } from '@/hooks/useBudgetId';
import { createExpense } from '@/app/actions';
import { ExpenseForm } from '../ExpenseForm';

export const EditExpenseForm: React.FC = () => {
	const { data } = useBudgetId();

	return (
		<ExpenseForm
			action={createExpense}
			heading={'Uppdatera utgift'}
			successMessage={'Utigften har uppdaterats'}
			errorMessage={'Något gick fel när din utgift skulle uppdateras'}
			buttonText={'Uppdatera'}
			expenseData={data}
		/>
	);
};
