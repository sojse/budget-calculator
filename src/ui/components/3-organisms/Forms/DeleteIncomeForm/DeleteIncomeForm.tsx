'use client';
import { useBudgetId } from '@/hooks/useBudgetId';
import { DeleteForm } from '../DeleteForm';
import { deleteIncome } from '@/app/actions';

export const DeleteIncomeForm: React.FC = ({}) => {
	const { data } = useBudgetId();

	return (
		<DeleteForm
			action={deleteIncome}
			heading="Radera inkomst"
			successMessage="Inkomsten har raderats"
			errorMessage="Något gick fel när inkomsten skulle raderas"
			data={data}
		/>
	);
};
