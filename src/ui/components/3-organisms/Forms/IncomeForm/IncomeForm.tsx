'use client';
import classNames from 'classnames';
import styles from './IncomeForm.module.scss';
import {
	Heading,
	FormfieldString,
	ModalButtons,
	FormfieldCheckbox,
} from '@/ui/components';
import { useBudgetId } from '@/hooks/useBudgetId';
import { Income } from '@/context/budgetIdContext';
import { useFormStateHook } from '@/hooks/useFormState';

export type State = {
	incomeType: { hasError: boolean };
	success: boolean;
	error: boolean;
	budgetId: string;
	incomeId?: string;
};

export interface IncomeFormProps {
	action: (currentState: State, formData: FormData) => Promise<any>;
	heading: string;
	successMessage: string;
	errorMessage: string;
	incomeData?: Income;
	buttonText: string;
}

export const IncomeForm: React.FC<IncomeFormProps> = ({
	action,
	heading,
	successMessage,
	errorMessage,
	incomeData,
	buttonText,
}) => {
	const { currentBudgetId } = useBudgetId();
	const { formAction, state } = useFormStateHook(
		action,
		{
			incomeType: { hasError: false },
			success: false,
			error: false,
			budgetId: currentBudgetId,
			incomeId: incomeData?.id,
		},
		successMessage,
		errorMessage
	);

	return (
		<>
			<Heading
				headingLevel="h1"
				color="primary"
				style="xs"
				className={classNames(styles.income_form_heading)}
			>
				{heading}
			</Heading>
			<form action={formAction} className={classNames(styles.income_form)}>
				<FormfieldString
					autoFocus
					id="incomeType"
					label="Inkomststyp"
					type="text"
					name="incomeType"
					defaultValue={incomeData?.title}
					state={{
						required: true,
						hasError: state?.incomeType?.hasError,
						errorMessage: 'Inkomststyp måste vara mellan 2-20 tecken',
					}}
				/>
				<FormfieldString
					id="incomeAmount"
					label="Summa"
					type="number"
					min={0}
					defaultValue={incomeData?.amount.toString()}
					name="incomeAmount"
					state={{ required: true }}
				/>
				{
					<FormfieldCheckbox
						id="monthlyTransaction"
						label={
							incomeData
								? 'Uppdatera kommande inkomster'
								: 'Löpande månadsinkomst'
						}
						name="monthlyTransaction"
						defaultChecked={incomeData?.monthlyTransaction}
						value="true"
					/>
				}

				<ModalButtons buttonText={buttonText} />
			</form>
		</>
	);
};
