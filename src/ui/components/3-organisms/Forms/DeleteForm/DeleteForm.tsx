'use client';
import classNames from 'classnames';
import styles from './DeleteForm.module.scss';
import { Heading, ModalButtons } from '@/ui/components';
import { useBudgetId } from '@/hooks/useBudgetId';
import { Income } from '@/context/budgetIdContext';
import { useFormStateHook } from '@/hooks/useFormState';

export type DeleteState = {
	success: boolean;
	error: boolean;
	budgetId: string;
	dataId?: string;
};

export interface DeleteFormProps {
	action: (currentState: DeleteState, formData: FormData) => Promise<any>;
	heading: string;
	successMessage: string;
	errorMessage: string;
	data: Income;
}

export const DeleteForm: React.FC<DeleteFormProps> = ({
	action,
	heading,
	successMessage,
	errorMessage,
	data,
}) => {
	const { currentBudgetId } = useBudgetId();
	const { formAction } = useFormStateHook(
		action,
		{
			success: false,
			error: false,
			budgetId: currentBudgetId,
			dataId: data.id,
		},
		successMessage,
		errorMessage
	);

	return (
		<>
			<Heading headingLevel="h1" color="primary" style="xs">
				{heading}
			</Heading>
			<form action={formAction} className={classNames(styles.delete_form)}>
				<span>Är du säker på att du vill radera "{data.title}"</span>
				<ModalButtons buttonText="Radera" deleteButton={true} />
			</form>
		</>
	);
};
