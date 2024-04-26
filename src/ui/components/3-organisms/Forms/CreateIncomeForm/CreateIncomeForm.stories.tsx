import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { CreateIncomeForm } from './CreateIncomeForm';

export default {
	title: 'Organisms/Forms/CreateIncome',
	component: CreateIncomeForm,
	tags: ['autodocs'],
} as Meta;

const Template: StoryFn = () => <CreateIncomeForm />;

export const Default: StoryFn = Template.bind({});
