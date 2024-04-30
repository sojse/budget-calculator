import React from 'react';
import classNames from 'classnames';
import styles from './IconCircle.module.scss';

export interface IconCircleProps {
	className?: string;
	size?: 'sm' | 'lg';
	style?:
		| 'primary'
		| 'secondary'
		| 'income'
		| 'home'
		| 'transportation'
		| 'savings'
		| 'shopping'
		| 'other'
		| 'entertainment';
	children: React.ReactNode;
}

export const IconCircle: React.FC<IconCircleProps> = ({
	className,
	children,
	size = 'sm',
	style = 'primary',
}) => {
	return (
		<div
			className={classNames(
				styles.icon_circle,
				styles[`icon_circle__${size}`],
				styles[`icon_circle__${style}`],
				className
			)}
		>
			{children}
		</div>
	);
};
