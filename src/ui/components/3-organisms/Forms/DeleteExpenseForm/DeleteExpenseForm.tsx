'use client';
import { useBudgetId } from '@/hooks/useBudgetId';
import { DeleteForm } from '../DeleteForm';
import { deleteExpense } from '@/app/actions';

export const DeleteExpenseForm: React.FC = ({}) => {
	const { data } = useBudgetId();

	return (
		<DeleteForm
			action={deleteExpense}
			heading="Radera inkomst"
			successMessage="Inkomsten har raderats"
			errorMessage="Något gick fel när inkosmten skulle raderas"
			data={data}
		/>
	);
};
