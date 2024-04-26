import React from 'react';
import classNames from 'classnames';
import styles from './FinanceBox.module.scss';
import {
	ContentBox,
	DeleteButton,
	EditButton,
	IconCircle,
} from '@/ui/components';
import TrashCan from '@/ui/icons/icon-trash.svg';
import Money from '@/ui/icons/icon-dollar-sign.svg';
import { formatCost } from '@/helpers/number';
import { Income } from '@/context/budgetIdContext';

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
	expenseInformation: Income;
}

const categories = {
	income: 'Inkomst',
	home: 'Hem',
	transport: 'Transport',
	savings: 'Sparande',
	shopping: 'Shopping',
	other: 'Övrigt',
	fun: 'Nöjen',
};

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
					{categories[category]}
				</span>
				<span className={classNames(styles.finance_box_text)}>
					{expenseInformation.title}
				</span>
			</div>
			<div className={classNames(styles.finance_box_right)}>
				<span className={classNames(styles.finance_box_text)}>
					{formatCost(expenseInformation.amount)} kr
				</span>
				<EditButton
					className={classNames(styles.finance_box_icon)}
					url="/modal/editIncome"
					income={expenseInformation}
				/>
				<DeleteButton
					className={classNames(styles.finance_box_icon)}
					url="/modal/deleteIncome"
					income={expenseInformation}
				/>
			</div>
		</ContentBox>
	);
};
