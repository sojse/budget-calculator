import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { FormfieldTextarea, FormfieldTextareaProps } from './FormfieldTextarea';

export default {
	title: 'Molecules/Form/FormfieldTextarea',
	component: FormfieldTextarea,
	tags: ['autodocs'],
} as Meta;

const Template: StoryFn<FormfieldTextareaProps> = (args) => (
	<FormfieldTextarea {...args} />
);

export const Default: StoryFn<FormfieldTextareaProps> = Template.bind({});
Default.args = {
	name: 'TextareaText',
	id: 'FormfieldTextarea',
	placeholder: 'Textarea placeholder',
	label: 'Form label',
};

export const DefaultWithValue: StoryFn<FormfieldTextareaProps> = Template.bind(
	{}
);
DefaultWithValue.args = {
	...Default.args,
	defaultValue: 'Textarea value',
};

export const Required: StoryFn<FormfieldTextareaProps> = Template.bind({});
Required.args = {
	...Default.args,
	state: { required: true },
};

export const Disabled: StoryFn<FormfieldTextareaProps> = Template.bind({});
Disabled.args = {
	...Default.args,
	state: { disabled: true },
};

export const Rows: StoryFn<FormfieldTextareaProps> = Template.bind({});
Rows.args = {
	...Default.args,
	rows: 10,
};

export const Error: StoryFn<FormfieldTextareaProps> = Template.bind({});
Error.args = {
	...Default.args,
	state: {
		hasError: true,
		errorMessage: 'Error message',
	},
};

export const HiddenLabel: StoryFn<FormfieldTextareaProps> = Template.bind({});
HiddenLabel.args = {
	...Default.args,
	state: { hiddenLabel: true },
};
