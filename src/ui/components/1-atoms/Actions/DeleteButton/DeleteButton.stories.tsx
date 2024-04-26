import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { DeleteButton, DeleteButtonProps } from './DeleteButton';

export default {
	title: 'Atoms/Actions/DeleteButton',
	component: DeleteButton,
	tags: ['autodocs'],
} as Meta;

const Template: StoryFn<DeleteButtonProps> = (args) => (
	<DeleteButton {...args} />
);

export const Default: StoryFn<DeleteButtonProps> = Template.bind({});
Default.args = {
	url: '#',
};
