import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { DeleteForm, DeleteFormProps } from './DeleteForm';
import { deleteIncome } from '@/app/actions';

export default {
	title: 'Organisms/Forms/DeleteForm',
	component: DeleteForm,
	tags: ['autodocs'],
} as Meta;

const Template: StoryFn<DeleteFormProps> = (args) => <DeleteForm {...args} />;

export const DeleteIncome: StoryFn<DeleteFormProps> = Template.bind({});
DeleteIncome.args = {
	action: deleteIncome,
	heading: 'Radera inkomst',
	successMessage: 'Inkomst raderad',
	errorMessage: 'Något gick fel när inkomsten skulle raderas',
	incomeData: {
		amount: 2000,
		title: 'Lön',
		monthlyTransaction: false,
		id: '1234',
		categoryType: { category: 'income' },
	},
};

export const DeleteExpense: StoryFn<DeleteFormProps> = Template.bind({});
DeleteExpense.args = {
	action: deleteIncome,
	heading: 'Radera utgift',
	successMessage: 'Utgift raderad',
	errorMessage: 'Något gick fel när utgiften skulle raderas',
	incomeData: {
		amount: 149,
		title: 'Netflix',
		monthlyTransaction: true,
		id: '1234',
		categoryType: { category: 'income' },
	},
};
