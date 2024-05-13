import React from 'react';
import classNames from 'classnames';
import styles from './StaticSiteHeading.module.scss';
import { Heading } from '@/ui/components';

export interface StaticSiteHeadingProps {
	children: string;
}

export const StaticSiteHeading: React.FC<StaticSiteHeadingProps> = async ({
	children,
}) => {
	return (
		<>
			<Heading
				headingLevel={'h2'}
				style="md"
				color="dark"
				className={classNames(styles.static_site_heading)}
			>
				{children}
			</Heading>
		</>
	);
};
