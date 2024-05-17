import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { CreateBudgetForm } from './CreateBudgetForm';

export default {
	title: 'Organisms/Forms/CreateBudget',
	component: CreateBudgetForm,
	tags: ['autodocs'],
} as Meta;

const Template: StoryFn = () => <CreateBudgetForm />;

export const Default: StoryFn = Template.bind({});
