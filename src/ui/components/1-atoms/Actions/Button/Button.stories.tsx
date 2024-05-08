import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Button, ButtonProps } from '@/ui/components';
import { fn } from '@storybook/test';

export default {
	title: 'Atoms/Actions/Button',
	component: Button,
	tags: ['autodocs'],
	args: { onClick: fn() },
} as Meta;

const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;

export const Primary: StoryFn<ButtonProps> = Template.bind({});
Primary.args = {
	children: 'Primary Button',
	style: 'primary',
};

export const PrimaryDisabled: StoryFn<ButtonProps> = Template.bind({});
PrimaryDisabled.args = {
	children: 'Primary Button Disabled',
	style: 'primary',
	disabled: true,
};

export const Secondary: StoryFn<ButtonProps> = Template.bind({});
Secondary.args = {
	children: 'Secondary Button',
	style: 'secondary',
};

export const SecondaryDisabled: StoryFn<ButtonProps> = Template.bind({});
SecondaryDisabled.args = {
	children: 'Secondary Button Disabled',
	style: 'secondary',
	disabled: true,
};

export const Underline: StoryFn<ButtonProps> = Template.bind({});
Underline.args = {
	children: 'Underline Button',
	style: 'underline',
};

export const UnderlineDisabled: StoryFn<ButtonProps> = Template.bind({});
UnderlineDisabled.args = {
	children: 'Underline Button Disabled',
	style: 'underline',
	disabled: true,
};

export const Loading: StoryFn<ButtonProps> = Template.bind({});
Loading.args = {
	children: 'Loading Button',
	style: 'primary',
	loading: true,
};
