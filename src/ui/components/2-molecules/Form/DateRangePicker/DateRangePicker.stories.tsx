import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { DateRangePicker, DateRangePickerProps } from './DateRangePicker';

export default {
	title: 'Molecules/Form/DateRangePicker',
	component: DateRangePicker,
	tags: ['autodocs'],
} as Meta;

const Template: StoryFn<DateRangePickerProps> = (args) => (
	<DateRangePicker {...args} />
);

export const Default: StoryFn<DateRangePickerProps> = Template.bind({});
Default.args = {
	label: 'Välj datum',
	id: 'pickDates',
	defaultValue: 'åååå-mm-dd - åååå-mm-dd',
	name: 'pickDates',
};

export const Required: StoryFn<DateRangePickerProps> = Template.bind({});
Required.args = {
	...Default.args,
	state: { required: true },
};
export const Disabled: StoryFn<DateRangePickerProps> = Template.bind({});
Disabled.args = {
	...Default.args,
	state: { disabled: true },
};

export const Error: StoryFn<DateRangePickerProps> = Template.bind({});
Error.args = {
	...Default.args,
	state: {
		hasError: true,
		errorMessage: 'Error message',
	},
};

export const HiddenLabel: StoryFn<DateRangePickerProps> = Template.bind({});
HiddenLabel.args = {
	...Default.args,
	state: { hiddenLabel: true },
};
