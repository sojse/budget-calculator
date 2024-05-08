import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { BarChart, BarChartProps } from '@/ui/components';

export default {
	title: 'Molecules/Charts/BarChart',
	component: BarChart,
	tags: ['autodocs'],
} as Meta;

const Template: StoryFn<BarChartProps> = (args) => <BarChart {...args} />;

export const Default: StoryFn<BarChartProps> = Template.bind({});
Default.args = {
	chartData: {
		labels: ['Bar 1', 'Bar 2', 'Bar 3', 'Bar 4'],
		datasets: [
			{
				label: 'Label 1',
				data: [1, 2, 3, 4],
			},
		],
	},
};

export const Horizontal: StoryFn<BarChartProps> = Template.bind({});
Horizontal.args = {
	chartData: {
		labels: ['Bar 1', 'Bar 2', 'Bar 3', 'Bar 4'],
		datasets: [
			{
				label: 'Label 1',
				data: [1, 2, 3, 4],
			},
		],
	},
	showLabels: false,
	horizontal: true,
};
