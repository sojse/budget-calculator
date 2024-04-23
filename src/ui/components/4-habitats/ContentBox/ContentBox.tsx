import React from 'react';
import classNames from 'classnames';
import styles from './ContentBox.module.scss';

export interface ContentBoxProps {
	children: React.ReactNode;
	className?: string;
}

export const ContentBox: React.FC<ContentBoxProps> = async ({
	children,
	className,
}) => {
	return (
		<div className={classNames(styles.content_box, className)}>{children}</div>
	);
};
