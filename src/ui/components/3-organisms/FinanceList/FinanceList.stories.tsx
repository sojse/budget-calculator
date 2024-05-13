import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { FinanceList, FinanceListProps } from '@/ui/components';

export default {
	title: 'Organisms/FinanceList',
	component: FinanceList,
	tags: ['autodocs'],
} as Meta;

const Template: StoryFn<FinanceListProps> = (args) => <FinanceList {...args} />;

export const Income: StoryFn<FinanceListProps> = Template.bind({});
Income.args = {
	listType: 'income',
	slug: ['April', '2024'],
};

export const Expense: StoryFn<FinanceListProps> = Template.bind({});
Expense.args = {
	listType: 'expense',
	slug: ['April', '2024'],
};
