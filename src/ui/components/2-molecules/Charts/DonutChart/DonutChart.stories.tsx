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
		labels: ['transport', 'shopping', 'other', 'home'],
		datasets: [
			{
				label: 'Label 1',
				data: [100, 2500, 3433, 4000],
				backgroundColor: [],
			},
		],
	},
	showLabels: false,
	totalAmount: 4555,
};
