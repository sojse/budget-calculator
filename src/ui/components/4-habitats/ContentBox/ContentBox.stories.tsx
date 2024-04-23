import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { ContentBox, ContentBoxProps } from './ContentBox';

export default {
	title: 'Habitats/ContentBox',
	component: ContentBox,
	tags: ['autodocs'],
} as Meta;

const Template: StoryFn<ContentBoxProps> = (args) => <ContentBox {...args} />;

export const Default: StoryFn<ContentBoxProps> = Template.bind({});
Default.args = {
	children: <div>Hej</div>,
};
