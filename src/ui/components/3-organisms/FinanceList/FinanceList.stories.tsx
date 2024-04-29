import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { FinanceList, FinanceListProps } from './FinanceList';

export default {
	title: 'Organisms/FinanceList',
	component: FinanceList,
	tags: ['autodocs'],
} as Meta;

const Template: StoryFn<FinanceListProps> = (args) => <FinanceList {...args} />;

export const Income: StoryFn<FinanceListProps> = Template.bind({});
Income.args = {
	listType: 'income',
	listObjects: [
		{
			category: 'income',
			data: {
				title: 'Lön',
				amount: 12300,
				monthlyTransaction: true,
				id: '12345',
				categoryType: { category: 'income' },
			},
		},
		{
			category: 'income',
			data: {
				title: 'CSN',
				amount: 12374,
				monthlyTransaction: true,
				id: '45657',
				categoryType: { category: 'income' },
			},
		},
		{
			category: 'income',
			data: {
				title: 'Present',
				amount: 400,
				monthlyTransaction: false,
				id: '563232',
				categoryType: { category: 'income' },
			},
		},
	],
};

export const Expense: StoryFn<FinanceListProps> = Template.bind({});
Expense.args = {
	listType: 'expense',
	listObjects: [
		{
			category: 'expense',
			data: {
				title: 'Hyra',
				amount: 12300,
				monthlyTransaction: true,
				id: '12345',
				categoryType: { category: 'home' },
			},
		},
		{
			category: 'expense',
			data: {
				title: 'Netflix',
				amount: 199,
				monthlyTransaction: true,
				id: '45657',
				categoryType: { category: 'entertainment' },
			},
		},
		{
			category: 'expense',
			data: {
				title: 'Däckbyte',
				amount: 400,
				monthlyTransaction: false,
				id: '563232',
				categoryType: { category: 'transport' },
			},
		},
	],
};
