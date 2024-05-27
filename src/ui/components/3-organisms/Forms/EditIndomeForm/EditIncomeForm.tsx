'use client';
import { editIncome } from '@/app/(actions)/incomeActions';
import { IncomeForm } from '../IncomeForm';
import { useBudgetId } from '@/hooks/useBudgetId';

export const EditIncomeForm: React.FC = () => {
	const { data } = useBudgetId();
	return (
		<IncomeForm
			action={editIncome}
			heading={'Redigera inkomst'}
			successMessage={'Inkomsten har uppdaterats'}
			errorMessage={'Något gick fel när din inkomst skulle uppdateras'}
			buttonText={'Uppdatera'}
			incomeData={data}
		/>
	);
};
