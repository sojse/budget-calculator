import React from 'react';
import classNames from 'classnames';
import styles from './FinanceBox.module.scss';
import { ContentBox, IconCircle } from '@/ui/components';
import Pen from '@/ui/icons/icon-pen.svg';
import TrashCan from '@/ui/icons/icon-trash.svg';
import Money from '@/ui/icons/icon-dollar-sign.svg';
import { capitalizeFirstLetter } from '@/helpers/string';
import { formatCost } from '@/helpers/number';

export interface FinanceBoxProps {
	className?: string;
	category:
		| 'income'
		| 'home'
		| 'transport'
		| 'savings'
		| 'shopping'
		| 'other'
		| 'fun';
	expenseInformation: {
		text: string;
		cost: number;
	};
}

export const FinanceBox: React.FC<FinanceBoxProps> = async ({
	className,
	category,
	expenseInformation,
}) => {
	return (
		<ContentBox className={classNames(styles.finance_box, className)}>
			<div className={classNames(styles.finance_box_left)}>
				<IconCircle style="primary" size="sm">
					<Money />
				</IconCircle>
				<span
					className={classNames(
						styles.finance_box_text,
						styles.finance_box_text__light
					)}
				>
					{capitalizeFirstLetter(category)}
				</span>
				<span className={classNames(styles.finance_box_text)}>
					{expenseInformation.text}
				</span>
			</div>
			<div className={classNames(styles.finance_box_right)}>
				<span className={classNames(styles.finance_box_text)}>
					{formatCost(expenseInformation.cost)} kr
				</span>
				<Pen
					className={classNames(
						styles.finance_box_icon,
						styles.finance_box_icon__update
					)}
				/>
				<TrashCan
					className={classNames(
						styles.finance_box_icon,
						styles.finance_box_icon__delete
					)}
				/>
			</div>
		</ContentBox>
	);
};
