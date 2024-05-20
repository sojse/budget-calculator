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
	loading: boolean;
}

export const InformationMessage: React.FC<InformationMessageProps> = ({
	className,
	message,
	style = 'positive',
	loading,
}) => {
	return (
		<div className={classNames(styles.information_message, className)}>
			{!loading ? (
				<IconCircle style={style}>
					{style === 'positive' ? <ThumbsUp /> : <ThumpsDown />}
				</IconCircle>
			) : (
				<IconCircle loading>
					<></>
				</IconCircle>
			)}
			<span className={classNames(loading && 'u-skeleton-text')}>
				{message}
			</span>
		</div>
	);
};
