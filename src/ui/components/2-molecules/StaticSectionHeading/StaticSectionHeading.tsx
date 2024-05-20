import React from 'react';
import classNames from 'classnames';
import styles from './StaticSectionHeading.module.scss';
import { Heading } from '@/ui/components';

export interface StaticSectionHeadingProps {
	children: string;
}

export const StaticSectionHeading: React.FC<
	StaticSectionHeadingProps
> = async ({ children }) => {
	return (
		<>
			<Heading
				headingLevel={'h2'}
				style="md"
				color="dark"
				className={classNames(styles.static_section_heading)}
			>
				{children}
			</Heading>
		</>
	);
};
