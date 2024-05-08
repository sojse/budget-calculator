import React from 'react';
import classNames from 'classnames';
import styles from './ChartLabel.module.scss';
import { categories } from '@/ui/components';

export interface ChartLabelProps {
	className?: string;
	label: string;
	amount?: string;
}

export const ChartLabel: React.FC<ChartLabelProps> = ({
	className,
	label,
	amount,
}) => {
	return (
		<div className={classNames(styles.chart_label, className)}>
			<span
				className={classNames(
					styles.chart_label_dot,
					styles[`chart_label_dot__${label.toLowerCase()}`]
				)}
			></span>
			<span className={classNames(styles.chart_label_amount)}>{amount}</span>
			<span>{categories[label.toLowerCase()]}</span>
		</div>
	);
};
