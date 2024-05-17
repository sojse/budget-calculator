'use client';
import classNames from 'classnames';
import styles from './CreateBudgetForm.module.scss';
import {
	Heading,
	FormfieldString,
	FormfieldTextarea,
	DateRangePicker,
	ModalButtons,
} from '@/ui/components';
import { submitNewBudget } from '@/app/actions';
import { useFormStateHook } from '@/hooks/useFormState';

export const CreateBudgetForm: React.FC = () => {
	const { formAction, state } = useFormStateHook(
		submitNewBudget,
		{
			budgetName: { id: '', hasError: false },
			budgetDates: { id: '', hasError: false },
			success: false,
			error: false,
			newRoute: '',
		},
		'Din budget har skapats',
		'Något gick fel när din budget skulle skapas'
	);

	return (
		<>
			<Heading
				headingLevel="h1"
				color="primary"
				style="xs"
				className={classNames(styles.budget_form_heading)}
			>
				Skapa ny budget
			</Heading>
			<form action={formAction} className={classNames(styles.budget_form)}>
				<FormfieldString
					autoFocus
					id="budgetName"
					label="Budgetnamn"
					type="text"
					name="budgetName"
					state={{
						required: true,
						hasError: state?.budgetName?.hasError,
						errorMessage: !state?.budgetName?.notUnique
							? 'Budgetnamn måste vara mellan 3-16 tecken'
							: 'En budget med detta namnet existerar redan för det valda året',
					}}
				/>
				<FormfieldTextarea
					id="budgetDescription"
					label="Beskrivning"
					name="budgetDescription"
				/>
				<DateRangePicker
					id="budgetDates"
					label="Välj datum"
					name="budgetDates"
					state={{
						required: true,
						hasError: state?.budgetDates?.hasError,
						errorMessage: 'Båda datum måste anges',
					}}
					defaultValue="åååå-mm-dd - åååå-mm-dd"
					className={classNames(styles.budget_form_date_picker)}
				/>
				<ModalButtons buttonText="Skapa budget" />
			</form>
		</>
	);
};
