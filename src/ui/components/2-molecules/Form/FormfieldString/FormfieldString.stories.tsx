import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { FormfieldString, FormfieldStringProps } from '@/ui/components';

export default {
	title: 'Molecules/Form/FormfieldString',
	component: FormfieldString,
	tags: ['autodocs'],
} as Meta;

const Template: StoryFn<FormfieldStringProps> = (args) => (
	<FormfieldString {...args} />
);

export const Default: StoryFn<FormfieldStringProps> = Template.bind({});
Default.args = {
	placeholder: 'Placeholder',
	type: 'text',
	name: 'inputName',
	id: 'inputId',
	label: 'Label',
};

export const Disabled: StoryFn<FormfieldStringProps> = Template.bind({});
Disabled.args = {
	...Default.args,
	state: { disabled: true },
};

export const Required: StoryFn<FormfieldStringProps> = Template.bind({});
Required.args = {
	...Default.args,
	state: { required: true },
};

export const Error: StoryFn<FormfieldStringProps> = Template.bind({});
Error.args = {
	...Default.args,
	state: { hasError: true, errorMessage: 'Error message' },
};

export const HiddenLabel: StoryFn<FormfieldStringProps> = Template.bind({});
HiddenLabel.args = {
	...Default.args,
	state: { hiddenLabel: true },
};
