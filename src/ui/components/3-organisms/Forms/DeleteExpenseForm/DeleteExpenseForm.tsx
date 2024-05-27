'use client';
import { useBudgetId } from '@/hooks/useBudgetId';
import { DeleteForm } from '../DeleteForm';
import { deleteExpense } from '@/app/(actions)/expenseActions';

export const DeleteExpenseForm: React.FC = ({}) => {
	const { data } = useBudgetId();

	return (
		<DeleteForm
			action={deleteExpense}
			heading="Radera utgift"
			successMessage="Utgiften har raderats"
			errorMessage="Något gick fel när utgiften skulle raderas"
			data={data}
		/>
	);
};
