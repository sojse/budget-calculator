import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Heading, HeadingProps } from './Heading';

export default {
	title: 'Atoms/Heading',
	component: Heading,
	tags: ['autodocs'],
} as Meta;

const Template: StoryFn<HeadingProps> = (args) => <Heading {...args} />;

export const Default: StoryFn<HeadingProps> = Template.bind({});
Default.args = {
	children: 'Heading Text',
	headingLevel: 'h1',
	color: 'primary',
};

export const XSmall: StoryFn<HeadingProps> = Template.bind({});
XSmall.args = {
	...Default.args,
	style: 'xs',
};

export const Small: StoryFn<HeadingProps> = Template.bind({});
Small.args = {
	...Default.args,
	style: 'sm',
};

export const Medium: StoryFn<HeadingProps> = Template.bind({});
Medium.args = {
	...Default.args,
	style: 'md',
};

export const Large: StoryFn<HeadingProps> = Template.bind({});
Large.args = {
	...Default.args,
	style: 'lg',
};

export const XLarge: StoryFn<HeadingProps> = Template.bind({});
XLarge.args = {
	...Default.args,
	style: 'xl',
};
