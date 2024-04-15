import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import FinancePage, { FinancePageProps } from './FinancePage';

export default {
	title: 'Templates/FinancePage',
	component: FinancePage,
	tags: ['autodocs'],
} as Meta;

const Template: StoryFn<FinancePageProps> = (args) => <FinancePage {...args} />;

export const Default: StoryFn<FinancePageProps> = Template.bind({});
Default.args = {
	budgetInformation: {
		children: 'Site Heading',
		budgetInformation: {
			years: [
				{ value: '2024', caption: '2024' },
				{ value: '2023', caption: '2023' },
				{ value: '2022', caption: '2022' },
				{ value: '2021', caption: '2021' },
			],
			months: [
				{ value: 'Januari', caption: 'Januari' },
				{ value: 'Februari', caption: 'Februari' },
				{ value: 'Mars', caption: 'Mars' },
				{ value: 'April', caption: 'April' },
			],
		},
	},
	header: {
		navigation: [
			{ url: '#', label: 'Link 1', isActive: false },
			{ url: '#', label: 'Link 2', isActive: true },
			{ url: '#', label: 'Link 3', isActive: false },
		],
	},
};
