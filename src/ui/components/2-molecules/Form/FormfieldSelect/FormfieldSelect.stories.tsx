import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { FormfieldSelect, FormfieldSelectProps } from './FormfieldSelect';

export default {
	title: 'Molecules/Form/FormfieldSelect',
	component: FormfieldSelect,
	tags: ['autodocs'],
} as Meta;

const Template: StoryFn<FormfieldSelectProps> = (args) => (
	<FormfieldSelect {...args} />
);

export const Default: StoryFn<FormfieldSelectProps> = Template.bind({});
Default.args = {
	id: 'select',
	label: 'Select label',
	name: 'select',
	options: [
		{
			value: '1',
			text: 'Option 1',
		},
		{
			value: '2',
			text: 'Option 2',
		},
		{
			value: '3',
			text: 'Option 3',
		},
	],
};

export const Required: StoryFn<FormfieldSelectProps> = Template.bind({});
Required.args = {
	...Default.args,
	state: {
		required: true,
		errorMessage: 'Error message',
	},
};

export const DefaultWithPlaceholder: StoryFn<FormfieldSelectProps> =
	Template.bind({});
DefaultWithPlaceholder.args = {
	...Default.args,
	defaultValue: 'DEFAULT',
	options: [
		{
			value: 'DEFAULT',
			text: '-- Choose option --',
			disabled: true,
		},
		{
			value: '1',
			text: 'Option 1',
		},
		{
			value: '2',
			text: 'Option 2',
		},
		{
			value: '3',
			text: 'Option 3',
		},
	],
};
export const Disabled: StoryFn<FormfieldSelectProps> = Template.bind({});
Disabled.args = {
	...Default.args,
	state: { disabled: true },
};

export const Error: StoryFn<FormfieldSelectProps> = Template.bind({});
Error.args = {
	...Default.args,
	state: {
		hasError: true,
		errorMessage: 'Error message',
	},
};

export const HiddenLabel: StoryFn<FormfieldSelectProps> = Template.bind({});
HiddenLabel.args = {
	...Default.args,
	state: { hiddenLabel: true },
};
