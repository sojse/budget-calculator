import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { AccordionButton, AccordionButtonProps } from '@/ui/components';

export default {
	title: 'Molecules/AccordionButton',
	component: AccordionButton,
	tags: ['autodocs'],
} as Meta;

const Template: StoryFn<AccordionButtonProps> = (args) => (
	<AccordionButton {...args} />
);

export const Income: StoryFn<AccordionButtonProps> = Template.bind({});
Income.args = {
	categoryType: {
		category: 'income',
	},
	amount: 2000,
	isOpen: false,
	onClick: (openState) => {},
};

export const Transport: StoryFn<AccordionButtonProps> = Template.bind({});
Transport.args = {
	amount: 400,
	categoryType: { category: 'transportation' },
	isOpen: false,
	onClick: (openState) => {},
};

export const Home: StoryFn<AccordionButtonProps> = Template.bind({});
Home.args = {
	amount: 400,
	categoryType: { category: 'home' },
	isOpen: false,
	onClick: (openState) => {},
};
export const Fun: StoryFn<AccordionButtonProps> = Template.bind({});
Fun.args = {
	amount: 400,
	categoryType: { category: 'entertainment' },
	isOpen: false,
	onClick: (openState) => {},
};

export const Saving: StoryFn<AccordionButtonProps> = Template.bind({});
Saving.args = {
	amount: 400,
	categoryType: { category: 'savings' },
	isOpen: false,
	onClick: (openState) => {},
};

export const Shopping: StoryFn<AccordionButtonProps> = Template.bind({});
Shopping.args = {
	amount: 400,
	categoryType: { category: 'shopping' },
	isOpen: false,
	onClick: (openState) => {},
};

export const Other: StoryFn<AccordionButtonProps> = Template.bind({});
Other.args = {
	amount: 400,
	categoryType: { category: 'other' },
	isOpen: false,
	onClick: (openState) => {},
};
