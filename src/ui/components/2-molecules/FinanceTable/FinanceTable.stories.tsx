import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { FinanceTable, FinanceTableProps } from '@/ui/components';

export default {
	title: 'Molecules/FinanceTable',
	component: FinanceTable,
	tags: ['autodocs'],
} as Meta;

const Template: StoryFn<FinanceTableProps> = (args) => (
	<FinanceTable {...args} />
);

export const Default: StoryFn<FinanceTableProps> = Template.bind({});
Default.args = {
	data: [
		{
			title: 'El',
			amount: 600,
			monthlyTransaction: false,
			id: '563232',
			categoryType: { category: 'other' },
		},
		{
			title: 'Vatten',
			amount: 547,
			monthlyTransaction: false,
			id: '563232',
			categoryType: { category: 'other' },
		},
		{
			title: 'Hyra',
			amount: 4500,
			monthlyTransaction: false,
			id: '563232',
			categoryType: { category: 'other' },
		},
		{
			title: 'Hemförsäkring',
			amount: 567,
			monthlyTransaction: false,
			id: '563232',
			categoryType: { category: 'other' },
		},
	],
	totalAmount: 5444,
};
