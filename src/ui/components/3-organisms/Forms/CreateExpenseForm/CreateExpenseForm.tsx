import { createExpense } from '@/app/(actions)/expenseActions';
import { ExpenseForm } from '../ExpenseForm';

export const CreateExpenseForm: React.FC = async () => {
	return (
		<ExpenseForm
			action={createExpense}
			heading={'Lägg till ny utgift'}
			successMessage={'Utigften har lagts till'}
			errorMessage={'Något gick fel när din utgift skulle läggas till'}
			buttonText={'Skapa utgift'}
		/>
	);
};
