'use client';
import classNames from 'classnames';
import styles from './CreateIncomeForm.module.scss';
import {
	Heading,
	FormfieldString,
	ModalButtons,
	FormfieldCheckbox,
} from '@/ui/components';
import { addNewIncome } from '@/app/actions';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { showToast } from '@/helpers/toast';
import { useBudgetId } from '@/hooks/useBudgetId';

export const CreateIncomeForm: React.FC = () => {
	const { currentBudgetId } = useBudgetId();
	const [state, formAction] = useFormState(addNewIncome, {
		incomeType: { hasError: false },
		success: false,
		error: false,
		id: currentBudgetId,
	});
	const router = useRouter();

	if (state?.success) {
		router.back();
		showToast('success', <span>Inkomsten har lagts till</span>);
	} else if (state?.error) {
		router.back();
		showToast(
			'error',
			<span>Något gick fel när din inkomst skulle läggas till</span>
		);
	}

	return (
		<>
			<Heading
				headingLevel="h1"
				color="primary"
				style="xs"
				className={classNames(styles.income_form_heading)}
			>
				Lägg till ny inkomst
			</Heading>
			<form action={formAction} className={classNames(styles.income_form)}>
				<FormfieldString
					tabIndex={0}
					id="incomeType"
					label="Inkomststyp"
					type="text"
					name="incomeType"
					state={{
						required: true,
						hasError: state?.incomeType?.hasError,
						errorMessage: 'Inkomststyp måste vara mellan 3-16 tecken',
					}}
				/>
				<FormfieldString
					id="incomeAmount"
					label="Summa"
					type="number"
					min={0}
					name="incomeAmount"
					state={{ required: true }}
				/>
				<FormfieldCheckbox
					id="monthlyTransaction"
					label="Löpande månadsinkomst"
					name="monthlyTransaction"
					value="true"
				/>
				<ModalButtons />
			</form>
		</>
	);
};
