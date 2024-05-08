import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { CreateBudgetForm, Modal, ModalProps } from '@/ui/components';

export default {
	title: 'Habitats/Modal',
	component: Modal,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
} as Meta;

const Template: StoryFn<ModalProps> = (args) => <Modal {...args} />;

export const Default: StoryFn<ModalProps> = Template.bind({});
Default.args = {
	children: <CreateBudgetForm />,
};
