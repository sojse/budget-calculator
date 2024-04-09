import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import {
	Paragraph,
	ContentSection,
	ContentSectionProps,
} from '@/ui/components';

export default {
	title: 'Habitats/ContentSection',
	component: ContentSection,
	tags: ['autodocs'],
} as Meta;

const Template: StoryFn<ContentSectionProps> = (args) => (
	<ContentSection {...args} />
);

export const Standard: StoryFn<ContentSectionProps> = Template.bind({});
Standard.args = {
	children:
		'Mauris posuere bibendum metus at pulvinar. Nam congue nulla ac finibus porta. Etiam justo augue, pretium eget nisl sed, elementum pharetra ipsum. In eleifend orci quis dolor rhoncus, eu euismod augue pulvinar. Quisque eget arcu viverra, tincidunt nibh eu, porttitor ex. In eget luctus erat, eu vehicula nunc. Mauris sit amet leo non leo ultricies ornare. Ut nec sem non lorem placerat placerat et a ante. Nullam ultrices nisl at elitrutrum, at dignissim diam vulputate. Nam sed ante bibendum, efficiturtortor nec, iaculis augue. Integer condimentum tincidunt scelerisque.Donec metus nibh, sodales a tortor et, euismod porttitor tortor. Sed ullamcorper porttitor arcu non cursus.',
	width: 'Standard',
};

export const Skinny: StoryFn<ContentSectionProps> = Template.bind({});
Skinny.args = {
	...Standard.args,
	width: 'Skinny',
};

export const Slim: StoryFn<ContentSectionProps> = Template.bind({});
Slim.args = {
	...Standard.args,
	width: 'Slim',
};

export const Small: StoryFn<ContentSectionProps> = Template.bind({});
Small.args = {
	...Standard.args,
	width: 'Small',
};

export const Wide: StoryFn<ContentSectionProps> = Template.bind({});
Wide.args = {
	...Standard.args,
	width: 'Wide',
};

export const FullWidth: StoryFn<ContentSectionProps> = Template.bind({});
FullWidth.args = {
	...Standard.args,
	width: 'Full width',
};
