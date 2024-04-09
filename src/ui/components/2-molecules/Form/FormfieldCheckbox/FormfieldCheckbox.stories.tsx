import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { FormfieldCheckbox, FormfieldCheckboxProps } from './FormfieldCheckbox';

export default {
	title: 'Molecules/Form/FormfieldCheckbox',
	component: FormfieldCheckbox,
	tags: ['autodocs'],
} as Meta;

const Template: StoryFn<FormfieldCheckboxProps> = (args) => (
	<FormfieldCheckbox {...args} />
);

export const Default: StoryFn<FormfieldCheckboxProps> = Template.bind({});
Default.args = {
	id: 'formfieldCheckbox',
	label: 'Checkbox label',
	defaultValue: 'checkbox',
	name: 'checkbox',
};

export const NoLabel: StoryFn<FormfieldCheckboxProps> = Template.bind({});
NoLabel.args = {
	id: 'formfieldCheckbox',
	defaultValue: 'checkbox',
	name: 'checkbox',
	label: 'Checkbox label',
	state: {
		hiddenLabel: true,
	},
};

export const HasError: StoryFn<FormfieldCheckboxProps> = Template.bind({});
HasError.args = {
	...Default.args,
	state: {
		hasError: true,
	},
};

export const Disabled: StoryFn<FormfieldCheckboxProps> = Template.bind({});
Disabled.args = {
	...Default.args,
	state: {
		disabled: true,
	},
};
