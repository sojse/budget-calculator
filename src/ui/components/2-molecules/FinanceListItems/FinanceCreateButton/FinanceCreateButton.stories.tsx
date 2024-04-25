import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import {
	FinanceCreateButton,
	FinanceCreateButtonProps,
} from './FinanceCreateButton';

export default {
	title: 'Molecules/FinanceListItems/FinanceCreateButton',
	component: FinanceCreateButton,
	tags: ['autodocs'],
} as Meta;

const Template: StoryFn<FinanceCreateButtonProps> = (args) => (
	<FinanceCreateButton {...args} />
);

export const Income: StoryFn<FinanceCreateButtonProps> = Template.bind({});
Income.args = {
	category: 'income',
};
