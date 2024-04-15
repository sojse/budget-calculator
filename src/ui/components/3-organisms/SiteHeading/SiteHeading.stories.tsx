import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { SiteHeading, SiteHeadingProps } from './SiteHeading';

export default {
	title: 'Organisms/SiteHeading',
	component: SiteHeading,
	tags: ['autodocs'],
} as Meta;

const Template: StoryFn<SiteHeadingProps> = (args) => <SiteHeading {...args} />;

export const Default: StoryFn<SiteHeadingProps> = Template.bind({});
Default.args = {
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
};
