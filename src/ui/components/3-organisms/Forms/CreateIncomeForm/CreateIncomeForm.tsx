import { addNewIncome } from '@/app/actions';
import { IncomeForm } from '../IncomeForm';

export const CreateIncomeForm: React.FC = async () => {
	return (
		<IncomeForm
			action={addNewIncome}
			heading={'Lägg till ny inkomst'}
			successMessage={'Inkomsten har lagts till'}
			errorMessage={'Något gick fel när din inkomst skulle läggas till'}
			buttonText={'Skapa inkomst'}
		/>
	);
};
