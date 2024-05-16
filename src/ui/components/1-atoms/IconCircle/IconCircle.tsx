import React from 'react';
import classNames from 'classnames';
import styles from './IconCircle.module.scss';

export interface IconCircleProps {
	className?: string;
	size?: 'sm' | 'lg';
	loading?: boolean;
	style?:
		| 'primary'
		| 'secondary'
		| 'income'
		| 'home'
		| 'transportation'
		| 'savings'
		| 'shopping'
		| 'other'
		| 'entertainment'
		| 'negative'
		| 'positive';

	children: React.ReactNode;
}

export const IconCircle: React.FC<IconCircleProps> = ({
	className,
	children,
	size = 'sm',
	style = 'primary',
	loading = false,
}) => {
	return (
		<div
			className={classNames(
				styles.icon_circle,
				styles[`icon_circle__${size}`],
				!loading ? styles[`icon_circle__${style}`] : 'u-skeleton-circle',
				className
			)}
		>
			{children}
		</div>
	);
};
