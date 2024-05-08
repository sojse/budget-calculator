import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { LinkComponent, LinkProps } from '@/ui/components';

export default {
	title: 'Atoms/Actions/Link',
	component: LinkComponent,
	tags: ['autodocs'],
} as Meta;

const Template: StoryFn<LinkProps> = (args) => <LinkComponent {...args} />;

export const Primary: StoryFn<LinkProps> = Template.bind({});
Primary.args = {
	children: 'Primary Link',
	url: '#',
	style: 'primary',
};

export const Dark: StoryFn<LinkProps> = Template.bind({});
Dark.args = {
	children: 'Dark Link',
	url: '#',
	style: 'dark',
};

export const Disabled: StoryFn<LinkProps> = Template.bind({});
Disabled.args = {
	children: 'Disabled Link',
	url: '#',
	style: 'disabled',
};

export const AsButton: StoryFn<LinkProps> = Template.bind({});
AsButton.args = {
	children: 'Button Link',
	url: '#',
	style: 'primary',
	asButton: true,
};
