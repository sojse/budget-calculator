import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Label, LabelProps } from '@/ui/components';

export default {
	title: 'Atoms/Form/Label',
	component: Label,
	tags: ['autodocs'],
} as Meta;

const Template: StoryFn<LabelProps> = (args) => <Label {...args} />;

export const Default: StoryFn<LabelProps> = Template.bind({});
Default.args = {
	id: 'label',
	children: 'Label',
};

export const Required: StoryFn<LabelProps> = Template.bind({});
Required.args = {
	...Default.args,
	state: {
		required: true,
	},
};

export const Disabled: StoryFn<LabelProps> = Template.bind({});
Disabled.args = {
	...Default.args,
	state: {
		disabled: true,
	},
};

export const Error: StoryFn<LabelProps> = Template.bind({});
Error.args = {
	...Default.args,
	state: {
		hasError: true,
	},
};

export const Hidden: StoryFn<LabelProps> = Template.bind({});
Hidden.args = {
	...Default.args,
	state: {
		isHidden: true,
	},
};
