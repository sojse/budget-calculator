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
import { useBudgetId } from '@/hooks/useBudgetId';
import { Expense } from '@/context/budgetIdContext';
import { useState } from 'react';
import { useFormStateHook } from '@/hooks/useFormState';

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
	const { state, formAction } = useFormStateHook(
		action,
		{
			expenseType: { hasError: false },
			success: false,
			error: false,
			budgetId: currentBudgetId,
			expenseId: expenseData?.id,
		},
		successMessage,
		errorMessage
	);

	const categoryOptions = Object.entries(categories).map(([key, value]) => {
		return { value: key, text: value };
	});
	const [selectedCategory, setSelectedCategory] = useState(
		expenseData?.categoryType.category
	);
	const [categoryTypes, setCategories] = useState(
		categoryOptions.filter((option) => option.value !== 'income')
	);

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
					autoFocus
					id="expenseType"
					label="Utgiftstyp"
					type="text"
					name="expenseType"
					defaultValue={expenseData?.title}
					state={{
						required: true,
						hasError: state?.expenseType?.hasError,
						errorMessage: 'Utgiftstyp måste vara mellan 2-20 tecken',
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
					id={'categoryType'}
					label={'Välj utgiftskategori'}
					name="categoryType"
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
