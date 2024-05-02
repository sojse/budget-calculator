import React from 'react';
import classNames from 'classnames';
import styles from './InformationMessage.module.scss';
import ThumbsUp from '@/ui/icons/icon-like.svg';
import ThumpsDown from '@/ui/icons/icon-dislike.svg';
import { IconCircle } from '@/ui/components';

export interface InformationMessageProps {
	className?: string;
	style: 'positive' | 'negative';
	message: string;
}

export const InformationMessage: React.FC<InformationMessageProps> = ({
	className,
	message,
	style = 'positive',
}) => {
	return (
		<div className={classNames(styles.information_message, className)}>
			<IconCircle style={style}>
				{style === 'positive' ? <ThumbsUp /> : <ThumpsDown />}
			</IconCircle>

			{message}
		</div>
	);
};
