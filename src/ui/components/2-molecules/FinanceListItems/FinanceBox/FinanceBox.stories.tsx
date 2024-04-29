import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { FinanceBox, FinanceBoxProps } from './FinanceBox';

export default {
	title: 'Molecules/FinanceListItems/FinanceBox',
	component: FinanceBox,
	tags: ['autodocs'],
} as Meta;

const Template: StoryFn<FinanceBoxProps> = (args) => <FinanceBox {...args} />;

export const Income: StoryFn<FinanceBoxProps> = Template.bind({});
Income.args = {
	category: 'income',
	data: {
		title: 'Present farmor',
		amount: 400,
		monthlyTransaction: false,
		id: '563232',
		categoryType: { category: 'income' },
	},
};

export const Transport: StoryFn<FinanceBoxProps> = Template.bind({});
Transport.args = {
	category: 'expense',
	data: {
		title: 'Expense',
		amount: 400,
		monthlyTransaction: false,
		id: '563232',
		categoryType: { category: 'transport' },
	},
};

export const Home: StoryFn<FinanceBoxProps> = Template.bind({});
Home.args = {
	category: 'expense',
	data: {
		title: 'Expense',
		amount: 400,
		monthlyTransaction: false,
		id: '563232',
		categoryType: { category: 'home' },
	},
};
export const Fun: StoryFn<FinanceBoxProps> = Template.bind({});
Fun.args = {
	category: 'expense',
	data: {
		title: 'Expense',
		amount: 400,
		monthlyTransaction: false,
		id: '563232',
		categoryType: { category: 'entertainment' },
	},
};

export const Saving: StoryFn<FinanceBoxProps> = Template.bind({});
Saving.args = {
	category: 'expense',
	data: {
		title: 'Expense',
		amount: 400,
		monthlyTransaction: false,
		id: '563232',
		categoryType: { category: 'savings' },
	},
};

export const Shopping: StoryFn<FinanceBoxProps> = Template.bind({});
Shopping.args = {
	category: 'expense',
	data: {
		title: 'Expense',
		amount: 400,
		monthlyTransaction: false,
		id: '563232',
		categoryType: { category: 'shopping' },
	},
};

export const Other: StoryFn<FinanceBoxProps> = Template.bind({});
Other.args = {
	category: 'expense',
	data: {
		title: 'Expense',
		amount: 400,
		monthlyTransaction: false,
		id: '563232',
		categoryType: { category: 'other' },
	},
};
