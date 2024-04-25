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
	expenseInformation: {
		text: 'Present från farmor',
		cost: 2000,
	},
};
