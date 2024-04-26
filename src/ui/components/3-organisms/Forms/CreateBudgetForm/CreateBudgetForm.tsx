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
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { showToast } from '@/helpers/toast';

export interface CreateBudgetFormProps {}
const initialState = {
	budgetName: { id: '', hasError: false },
	budgetDates: { id: '', hasError: false },
};

export const CreateBudgetForm: React.FC<CreateBudgetFormProps> = () => {
	const [state, formAction] = useFormState(submitNewBudget, initialState);
	const router = useRouter();

	if (state?.success) {
		router.push(state.newRoute);
		showToast('success', <span>Din budget har skapats</span>);
	} else if (state?.success) {
		router.back();
		showToast(
			'error',
			<span>Något gick fel när din budget skulle skapas</span>
		);
	}

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
					tabIndex={0}
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
