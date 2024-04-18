import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { CreateBudgetForm, CreateBudgetFormProps } from './CreateBudgetForm';

export default {
	title: 'Organisms/Forms/CreateBudget',
	component: CreateBudgetForm,
	tags: ['autodocs'],
} as Meta;

const Template: StoryFn<CreateBudgetFormProps> = () => <CreateBudgetForm />;

export const Default: StoryFn<CreateBudgetFormProps> = Template.bind({});
