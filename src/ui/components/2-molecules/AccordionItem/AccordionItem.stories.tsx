import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { AccordionItem, AccordionItemProps } from '@/ui/components';

export default {
	title: 'Molecules/AccordionItem',
	component: AccordionItem,
	tags: ['autodocs'],
} as Meta;

const Template: StoryFn<AccordionItemProps> = (args) => (
	<AccordionItem {...args} />
);

export const Income: StoryFn<AccordionItemProps> = Template.bind({});
Income.args = {
	categoryType: {
		category: 'income',
	},
	amount: 2000,
};

export const Transport: StoryFn<AccordionItemProps> = Template.bind({});
Transport.args = {
	amount: 400,

	categoryType: { category: 'transportation' },
};

export const Home: StoryFn<AccordionItemProps> = Template.bind({});
Home.args = {
	amount: 400,

	categoryType: { category: 'home' },
};
export const Fun: StoryFn<AccordionItemProps> = Template.bind({});
Fun.args = {
	amount: 400,

	categoryType: { category: 'entertainment' },
};

export const Saving: StoryFn<AccordionItemProps> = Template.bind({});
Saving.args = {
	amount: 400,

	categoryType: { category: 'savings' },
};

export const Shopping: StoryFn<AccordionItemProps> = Template.bind({});
Shopping.args = {
	amount: 400,

	categoryType: { category: 'shopping' },
};

export const Other: StoryFn<AccordionItemProps> = Template.bind({});
Other.args = {
	amount: 400,

	categoryType: { category: 'other' },
};
