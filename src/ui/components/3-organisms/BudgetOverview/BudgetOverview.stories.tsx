import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { BudgetOverview, BudgetOverviewProps } from './BudgetOverview';

export default {
	title: 'Organisms/BudgetOverview',
	component: BudgetOverview,
	tags: ['autodocs'],
} as Meta;

const Template: StoryFn<BudgetOverviewProps> = (args) => (
	<BudgetOverview {...args} />
);

export const Default: StoryFn<BudgetOverviewProps> = Template.bind({});
Default.args = {
	chartData: {
		labels: ['Income', 'Expense'],
		datasets: [
			{
				label: 'Amount',
				data: [43000, 21677],
			},
		],
	},
	detailUrl: '#',
};
