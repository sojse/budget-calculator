'use client';
import classNames from 'classnames';
import styles from './DeleteForm.module.scss';
import { Heading, ModalButtons } from '@/ui/components';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { showToast } from '@/helpers/toast';
import { useBudgetId } from '@/hooks/useBudgetId';
import { Income } from '@/context/budgetIdContext';

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
	const [state, formAction] = useFormState(action, {
		success: false,
		error: false,
		budgetId: currentBudgetId,
		dataId: data.id,
	});
	const router = useRouter();

	if (state?.success) {
		router.back();
		showToast('success', <span>{successMessage}</span>);
	} else if (state?.error) {
		router.back();
		showToast('error', <span>{errorMessage}</span>);
	}

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