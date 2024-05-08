import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { InformationMessage, InformationMessageProps } from '@/ui/components';

export default {
	title: 'Molecules/InformationMessage',
	component: InformationMessage,
	tags: ['autodocs'],
} as Meta;

const Template: StoryFn<InformationMessageProps> = (args) => (
	<InformationMessage {...args} />
);

export const Positive: StoryFn<InformationMessageProps> = Template.bind({});
Positive.args = {
	message: 'Test message',
	style: 'positive',
};

export const Negative: StoryFn<InformationMessageProps> = Template.bind({});
Negative.args = {
	message: 'Test message',
	style: 'negative',
};
