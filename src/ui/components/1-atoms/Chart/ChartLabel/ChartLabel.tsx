import React from 'react';
import classNames from 'classnames';
import styles from './ChartLabel.module.scss';
import { categories } from '@/ui/components';

export interface ChartLabelProps {
	className?: string;
	label: string;
	amount?: string;
	loading: boolean;
}

export const ChartLabel: React.FC<ChartLabelProps> = ({
	className,
	label,
	amount,
	loading,
}) => {
	return (
		<div className={classNames(styles.chart_label, className)}>
			<span
				className={classNames(
					styles.chart_label_dot,
					loading
						? 'u-skeleton-circle'
						: styles[`chart_label_dot__${label.toLowerCase()}`]
				)}
			></span>
			<span
				className={classNames(
					styles.chart_label_amount,
					loading &&
						'u-skeleton-text u-skeleton-text--thin u-skeleton-text--medium'
				)}
			>
				{!loading && amount}
			</span>
			<span>{categories[label.toLowerCase()]}</span>
		</div>
	);
};
