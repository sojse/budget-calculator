'use client';
import { useBudgetId } from '@/hooks/useBudgetId';
import { ExpenseForm } from '../ExpenseForm';
import { editExpense } from '@/app/(actions)/expenseActions';

export const EditExpenseForm: React.FC = () => {
	const { data } = useBudgetId();

	return (
		<ExpenseForm
			action={editExpense}
			heading={'Uppdatera utgift'}
			successMessage={'Utigften har uppdaterats'}
			errorMessage={'Något gick fel när din utgift skulle uppdateras'}
			buttonText={'Uppdatera'}
			expenseData={data}
		/>
	);
};
