import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Header, HeaderProps } from './Header';

export default {
	title: 'Habitats/Header',
	component: Header,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
} as Meta;

const Template: StoryFn<HeaderProps> = (args) => <Header {...args} />;

export const Default: StoryFn<HeaderProps> = Template.bind({});
Default.args = {
	navigation: [
		{ url: '#', label: 'Link 1', isActive: false },
		{ url: '#', label: 'Link 2', isActive: true },
		{ url: '#', label: 'Link 3', isActive: false },
	],
};
