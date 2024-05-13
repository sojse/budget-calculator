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
	slug: ['April', '2024'],
};
