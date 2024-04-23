import React from 'react';
import classNames from 'classnames';
import styles from './TwoColumnLayout.module.scss';
import { ContentSection } from '../ContentSection';

export interface TwoColumnLayoutProps {
	column1: React.ReactNode;
	column2: React.ReactNode;
}

export const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = async ({
	column1,
	column2,
}) => {
	return (
		<ContentSection
			className={classNames(styles.two_column)}
			width="Wide"
			asSection={false}
		>
			<div className={classNames(styles.two_column_first)}>{column1}</div>
			<div className={classNames(styles.two_column_second)}>{column2}</div>
		</ContentSection>
	);
};
