import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { AccordionItem, AccordionItemProps } from '@/ui/components';

export default {
	title: 'Organisms/AccordionItem',
	component: AccordionItem,
	tags: ['autodocs'],
} as Meta;

const Template: StoryFn<AccordionItemProps> = (args) => (
	<AccordionItem {...args} />
);

export const Default: StoryFn<AccordionItemProps> = Template.bind({});
Default.args = {
	categoryType: {
		category: 'home',
	},
	data: [
		{
			title: 'El',
			amount: 600,
			monthlyTransaction: false,
			id: '563232',
			categoryType: { category: 'other' },
		},
		{
			title: 'Vatten',
			amount: 547,
			monthlyTransaction: false,
			id: '563232',
			categoryType: { category: 'other' },
		},
		{
			title: 'Hyra',
			amount: 4500,
			monthlyTransaction: false,
			id: '563232',
			categoryType: { category: 'other' },
		},
		{
			title: 'Hemförsäkring',
			amount: 567,
			monthlyTransaction: false,
			id: '563232',
			categoryType: { category: 'other' },
		},
	],
	amount: 2000,
};
