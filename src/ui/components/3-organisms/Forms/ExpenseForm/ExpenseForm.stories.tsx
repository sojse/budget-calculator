import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { ExpenseForm, ExpenseFormProps } from './ExpenseForm';
import { createExpense } from '@/app/(actions)/expenseActions';

export default {
	title: 'Organisms/Forms/ExpenseForm',
	component: ExpenseForm,
	tags: ['autodocs'],
} as Meta;

const Template: StoryFn<ExpenseFormProps> = (args) => <ExpenseForm {...args} />;

export const CreateExpense: StoryFn<ExpenseFormProps> = Template.bind({});
CreateExpense.args = {
	action: createExpense,
	heading: 'Skapa ny utgift',
	successMessage: 'Utgift skapad',
	errorMessage: 'Något gick fel när utgiften skulle skapas',
	buttonText: 'Skapa utgift',
};

export const UpdateExpense: StoryFn<ExpenseFormProps> = Template.bind({});
UpdateExpense.args = {
	action: createExpense,
	heading: 'Redigera utgift',
	successMessage: 'Utgift uppdaterad',
	errorMessage: 'Något gick fel när utgiften skulle uppdateras',
	expenseData: {
		amount: 2000,
		title: 'Billån',
		monthlyTransaction: true,
		id: '1234',
		categoryType: { category: 'transportation' },
	},
	buttonText: 'Uppdatera utgift',
};
