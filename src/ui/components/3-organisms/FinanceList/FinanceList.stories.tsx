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
			expenseInformation: {
				title: 'Lön',
				amount: 12300,
				monthlyTransaction: true,
				id: '12345',
			},
		},
		{
			category: 'income',
			expenseInformation: {
				title: 'CSN',
				amount: 12374,
				monthlyTransaction: true,
				id: '45657',
			},
		},
		{
			category: 'income',
			expenseInformation: {
				title: 'Present',
				amount: 400,
				monthlyTransaction: false,
				id: '563232',
			},
		},
	],
};
