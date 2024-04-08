import React from 'react';
import classNames from 'classnames';
import styles from './Heading.module.scss';

export type HeadingProps = {
	children?: string;
	className?: string;
	headingLevel: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	style?: 'default' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	color?: 'primary' | 'secondary' | 'dark' | 'light';
	align?: 'default' | 'center' | 'right';
};

export const Heading: React.FC<HeadingProps> = ({
	children,
	className,
	headingLevel,
	color = 'primary',
	style = 'default',
	align = 'default',
}) =>
	React.createElement(
		headingLevel,
		{
			className: classNames(
				styles.heading,
				styles[`heading__${align}`],
				styles[`heading__${style}`],
				styles[`heading__${color}`],
				className
			),
		},
		children
	);
