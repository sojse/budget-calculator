'use client';
import { editIncome } from '@/app/actions';
import { IncomeForm } from '../IncomeForm';
import { useBudgetId } from '@/hooks/useBudgetId';

export const EditIncomeForm: React.FC = () => {
	const { income } = useBudgetId();
	return (
		<IncomeForm
			action={editIncome}
			heading={'Redigera inkomst'}
			successMessage={'Inkomsten har uppdaterats'}
			errorMessage={'Något gick fel när din inkomst skulle uppdateras'}
			buttonText={'Uppdatera inkomst'}
			incomeData={income}
		/>
	);
};
