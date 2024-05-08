import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { EditButton, EditButtonProps } from '@/ui/components';

export default {
	title: 'Atoms/Actions/EditButton',
	component: EditButton,
	tags: ['autodocs'],
} as Meta;

const Template: StoryFn<EditButtonProps> = (args) => <EditButton {...args} />;

export const Default: StoryFn<EditButtonProps> = Template.bind({});
Default.args = {
	url: '#',
};
