import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Paragraph, ParagraphProps } from './Paragraph';

export default {
	title: 'Atoms/Paragraph',
	component: Paragraph,
	tags: ['autodocs'],
} as Meta;

const Template: StoryFn<ParagraphProps> = (args) => <Paragraph {...args} />;

export const Default: StoryFn<ParagraphProps> = Template.bind({});
Default.args = {
	children: 'Paragraph Default',
};

export const Short: StoryFn<ParagraphProps> = Template.bind({});
Short.args = {
	children:
		'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
};

export const Long: StoryFn<ParagraphProps> = Template.bind({});
Long.args = {
	children:
		'Mauris posuere bibendum metus at pulvinar. Nam congue nulla ac finibus porta. Etiam justo augue, pretium eget nisl sed, elementum pharetra ipsum. In eleifend orci quis dolor rhoncus, eu euismod augue pulvinar. Quisque eget arcu viverra, tincidunt nibh eu, porttitor ex. In eget luctus erat, eu vehicula nunc. Mauris sit amet leo non leo ultricies ornare. Ut nec sem non lorem placerat placerat et a ante. Nullam ultrices nisl at elit rutrum, at dignissim diam vulputate. Nam sed ante bibendum, efficitur tortor nec, iaculis augue. Integer condimentum tincidunt scelerisque. Donec metus nibh, sodales a tortor et, euismod porttitor tortor. Sed ullamcorper porttitor arcu non cursus.',
};
