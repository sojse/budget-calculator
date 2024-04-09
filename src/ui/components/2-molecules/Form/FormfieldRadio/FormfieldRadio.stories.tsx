import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { FormfieldRadio, FormfieldRadioProps } from './FormfieldRadio';

export default {
	title: 'Molecules/Form/FormfieldRadio',
	component: FormfieldRadio,
	tags: ['autodocs'],
} as Meta;

const Template: StoryFn<FormfieldRadioProps> = (args) => (
	<FormfieldRadio {...args} />
);

export const Default: StoryFn<FormfieldRadioProps> = Template.bind({});
Default.args = {
	id: 'FormfieldRadio',
	label: 'Radio label',
	name: 'radio',
	value: 'radio1',
};

export const NoLabel: StoryFn<FormfieldRadioProps> = Template.bind({});
NoLabel.args = {
	id: 'FormfieldRadio',
	name: 'radio',
	label: 'Radio label',
	value: 'radio1',
	state: {
		hiddenLabel: true,
	},
};

export const HasError: StoryFn<FormfieldRadioProps> = Template.bind({});
HasError.args = {
	...Default.args,
	state: {
		hasError: true,
	},
};

export const Disabled: StoryFn<FormfieldRadioProps> = Template.bind({});
Disabled.args = {
	...Default.args,
	state: {
		disabled: true,
	},
};
