import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { TwoColumnLayout, TwoColumnLayoutProps } from './TwoColumnLayout';

export default {
	title: 'Habitats/TwoColumnLayout',
	component: TwoColumnLayout,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
} as Meta;

const Template: StoryFn<TwoColumnLayoutProps> = (args) => (
	<TwoColumnLayout {...args} />
);

export const Default: StoryFn<TwoColumnLayoutProps> = Template.bind({});
Default.args = {
	column1: <div>Hej</div>,
	column2: <div>2</div>,
};
