import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { IconCircle, IconCircleProps } from './IconCircle';
import Wallet from '@/ui/icons/icon-wallet.svg';

export default {
	title: 'Atoms/IconCircle',
	component: IconCircle,
	tags: ['autodocs'],
} as Meta;

const Template: StoryFn<IconCircleProps> = (args) => <IconCircle {...args} />;

export const Default: StoryFn<IconCircleProps> = Template.bind({});
Default.args = {
	children: <Wallet />,
	size: 'sm',
	style: 'primary',
};

export const Large: StoryFn<IconCircleProps> = Template.bind({});
Large.args = {
	children: <Wallet />,
	size: 'lg',
	style: 'primary',
};
