import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { DonutChart, DonutChartProps } from '@/ui/components';

export default {
	title: 'Molecules/Charts/DonutChart',
	component: DonutChart,
	tags: ['autodocs'],
} as Meta;

const Template: StoryFn<DonutChartProps> = (args) => <DonutChart {...args} />;

export const Default: StoryFn<DonutChartProps> = Template.bind({});
Default.args = {
	chartData: {
		labels: ['Bar 1', 'Bar 2', 'Bar 3', 'Bar 4'],
		datasets: [
			{
				label: 'Label 1',
				data: [1, 2, 3, 4],
				backgroundColor: [],
			},
		],
	},
	showLabels: false,
};
