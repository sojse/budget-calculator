import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { ErrorMessage, ErrorMessageProps } from '@/ui/components';

export default {
	title: 'Atoms/Form/ErrorMessage',
	component: ErrorMessage,
	tags: ['autodocs'],
} as Meta;

const Template: StoryFn<ErrorMessageProps> = (args) => (
	<ErrorMessage {...args} />
);

export const Default: StoryFn<ErrorMessageProps> = Template.bind({});
Default.args = {
	id: 'error',
	children: 'An error has occured!',
};
