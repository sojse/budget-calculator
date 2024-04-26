import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { IncomeForm, IncomeFormProps } from './IncomeForm';
import { addNewIncome } from '@/app/actions';

export default {
	title: 'Organisms/Forms/IncomeForm',
	component: IncomeForm,
	tags: ['autodocs'],
} as Meta;

const Template: StoryFn<IncomeFormProps> = (args) => <IncomeForm {...args} />;

export const CreateIncome: StoryFn<IncomeFormProps> = Template.bind({});
CreateIncome.args = {
	action: addNewIncome,
	heading: 'Skapa ny inkomst',
	successMessage: 'Inkomst skapad',
	errorMessage: 'Något gick fel när inkomsten skulle skapas',
	buttonText: 'Skapa inkomst',
};

export const UpdateIncome: StoryFn<IncomeFormProps> = Template.bind({});
UpdateIncome.args = {
	action: addNewIncome,
	heading: 'Redigera inkomst',
	successMessage: 'Inkomst uppdaterad',
	errorMessage: 'Något gick fel när inkomsten skulle uppdateras',
	incomeData: {
		amount: 2000,
		title: 'Lön',
		monthlyTransaction: true,
		id: '1234',
	},
	buttonText: 'Uppdatera inkomst',
};
