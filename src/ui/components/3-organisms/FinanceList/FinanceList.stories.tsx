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
				text: 'Present från farmor',
				cost: 2000,
			},
		},
		{
			category: 'income',
			expenseInformation: {
				text: 'Lön',
				cost: 46000,
			},
		},
		{
			category: 'income',
			expenseInformation: {
				text: 'Csn',
				cost: 12543,
			},
		},
	],
};
