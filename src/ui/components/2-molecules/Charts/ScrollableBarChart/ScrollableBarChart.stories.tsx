import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { ScrollableBarChart, ScrollableBarChartProps } from '@/ui/components';

export default {
	title: 'Molecules/Charts/ScrollableBarChart',
	component: ScrollableBarChart,
	tags: ['autodocs'],
} as Meta;

const Template: StoryFn<ScrollableBarChartProps> = (args) => (
	<ScrollableBarChart {...args} />
);

export const Default: StoryFn<ScrollableBarChartProps> = Template.bind({});
Default.args = {
	chartData: {
		labels: [
			'Bar 1',
			'Bar 2',
			'Bar 3',
			'Bar 4',
			'Bar 5',
			'Bar 6',
			'Bar 7',
			'Bar 8',
			'Bar 9',
			'Bar 10',
			'Bar 11',
		],
		datasets: [
			{
				label: 'Label 1',
				data: [600, 500, 600, 700, 200, 300, 400, 300, 400, 800, 300],
			},
			{
				label: 'Label 2',
				data: [700, 800, 300, 500, 300, 400, 500, 600, 200, 300, 400],
			},
		],
	},
};

export const FewItems: StoryFn<ScrollableBarChartProps> = Template.bind({});
FewItems.args = {
	chartData: {
		labels: ['Bar 1', 'Bar 2', 'Bar 3', 'Bar 4', 'Bar 5'],
		datasets: [
			{
				label: 'Label 1',
				data: [600, 500, 600, 700, 300],
			},
			{
				label: 'Label 2',
				data: [700, 800, 300, 500, 300],
			},
		],
	},
};

export const VeryFewItems: StoryFn<ScrollableBarChartProps> = Template.bind({});
VeryFewItems.args = {
	chartData: {
		labels: ['Bar 1', 'Bar 2', 'Bar 3'],
		datasets: [
			{
				label: 'Label 1',
				data: [600, 500, 600],
			},
			{
				label: 'Label 2',
				data: [700, 800, 300],
			},
		],
	},
};
