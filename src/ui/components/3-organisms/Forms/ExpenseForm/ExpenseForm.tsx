'use client';
import classNames from 'classnames';
import styles from './ExpenseForm.module.scss';
import {
	Heading,
	FormfieldString,
	ModalButtons,
	FormfieldCheckbox,
	FormfieldSelect,
	categories,
} from '@/ui/components';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { showToast } from '@/helpers/toast';
import { useBudgetId } from '@/hooks/useBudgetId';
import { Expense } from '@/context/budgetIdContext';
import { useState } from 'react';

export type ExpenseState = {
	expenseType: { hasError: boolean };
	success: boolean;
	error: boolean;
	budgetId: string;
	expenseId?: string;
};

export interface ExpenseFormProps {
	action: (currentState: ExpenseState, formData: FormData) => Promise<any>;
	heading: string;
	successMessage: string;
	errorMessage: string;
	expenseData?: Expense;
	buttonText: string;
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({
	action,
	heading,
	successMessage,
	errorMessage,
	expenseData,
	buttonText,
}) => {
	const { currentBudgetId } = useBudgetId();
	const [state, formAction] = useFormState(action, {
		expenseType: { hasError: false },
		success: false,
		error: false,
		budgetId: currentBudgetId,
		expenseId: expenseData?.id,
	});
	const categoryOptions = Object.entries(categories).map(([key, value]) => {
		return { value: key, text: value };
	});
	const [selectedCategory, setSelectedCategory] = useState(
		expenseData?.categoryType.category
	);
	const [categoryTypes, setCategories] = useState(
		categoryOptions.filter((option) => option.value !== 'income')
	);
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
			<Heading
				headingLevel="h1"
				color="primary"
				style="xs"
				className={classNames(styles.expense_form_heading)}
			>
				{heading}
			</Heading>
			<form action={formAction} className={classNames(styles.expense_form)}>
				<FormfieldString
					tabIndex={0}
					id="expenseType"
					label="Utgiftstyp"
					type="text"
					name="expenseType"
					defaultValue={expenseData?.title}
					state={{
						required: true,
						hasError: state?.expenseType?.hasError,
						errorMessage: 'Utgiftstyp måste vara mellan 3-16 tecken',
					}}
				/>
				<FormfieldString
					id="expenseAmount"
					label="Summa"
					type="number"
					min={0}
					defaultValue={expenseData?.amount.toString()}
					name="expenseAmount"
					state={{ required: true }}
				/>
				<FormfieldSelect
					id={'expenseCategory'}
					label={'Välj utgiftskategori'}
					options={categoryTypes}
					value={selectedCategory}
					onChange={(e: any) => setSelectedCategory(e.target.value)}
				/>
				<FormfieldCheckbox
					id="monthlyTransaction"
					label={
						expenseData ? 'Uppdatera kommande utgifter' : 'Löpande månadsutgift'
					}
					name="monthlyTransaction"
					defaultChecked={expenseData?.monthlyTransaction}
					value="true"
				/>
				<ModalButtons buttonText={buttonText} />
			</form>
		</>
	);
};
