import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { LoadMore, LoadMoreProps } from './LoadMore';

export default {
	title: 'Molecules/LoadMore',
	component: LoadMore,
	tags: ['autodocs'],
} as Meta;

const Template: StoryFn<LoadMoreProps> = (args) => <LoadMore {...args} />;

export const Default: StoryFn<LoadMoreProps> = Template.bind({});
Default.args = {
	children: [1, 2, 3, 4, 5],
	visibleElements: 3,
};
