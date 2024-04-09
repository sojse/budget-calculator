import React from 'react';
import classNames from 'classnames';
import styles from './Paragraph.module.scss';

export interface ParagraphProps {
	children: React.ReactNode;
	weight?: 'default' | 'semibold' | 'bold';
	style?: any;
	className?: string;
}

export const Paragraph: React.FC<ParagraphProps> = ({
	children,
	className,
	style,
	weight = 'default',
}) => (
	<p
		style={style}
		className={classNames(
			styles.paragraph,
			styles[`paragraph___${weight}`],
			className
		)}
	>
		{children}
	</p>
);
