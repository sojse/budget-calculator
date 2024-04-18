'use client';
import classNames from 'classnames';
import styles from './CreateBudgetForm.module.scss';
import {
	Heading,
	FormfieldString,
	FormfieldTextarea,
	Button,
	DateRangePicker,
} from '@/ui/components';
import { submitNewBudget } from '@/app/actions';
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';

export interface CreateBudgetFormProps {}

export const CreateBudgetForm: React.FC<CreateBudgetFormProps> = () => {
	const formStatus = useFormStatus();
	const [state, formAction] = useFormState(submitNewBudget, {
		budgetName: { id: '', hasError: false },
		budgetDates: { id: '', hasError: false },
	});
	const router = useRouter();

	const goBack = () => {
		router.back();
	};

	console.log(state);

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
					id="budgetName"
					label="Budgetnamn"
					type="text"
					name="budgetName"
					state={{
						required: true,
						hasError: state?.budgetName.hasError,
						errorMessage: 'Budgetnamn måste vara mellan 3-16 tecken',
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
						hasError: state?.budgetDates.hasError,
						errorMessage: 'Slutdatum måste anges',
					}}
					defaultValue="åååå-mm-dd - åååå-mm-dd"
				/>
				<div className={classNames(styles.budget_form_buttons)}>
					<Button
						style="primary"
						type="submit"
						disabled={formStatus.pending}
						className={classNames(styles.budget_form_button)}
					>
						{formStatus.pending ? 'Laddar...' : 'Skapa budget'}
					</Button>
					<Button
						style="secondary"
						type="button"
						disabled={formStatus.pending}
						onClick={goBack}
						className={classNames(styles.budget_form_button)}
					>
						Avbryt
					</Button>
				</div>
			</form>
		</>
	);
};
