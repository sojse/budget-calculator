import React from 'react';
import classNames from 'classnames';
import styles from './FinanceBox.module.scss';
import {
	ContentBox,
	DeleteButton,
	EditButton,
	IconCircle,
} from '@/ui/components';
import * as Icons from '@/ui/icons';
import { formatCost } from '@/helpers/number';
import { Expense, Income } from '@/context/budgetIdContext';
import { capitalizeFirstLetter } from '@/helpers/string';

export interface FinanceBoxProps {
	className?: string;
	category: 'income' | 'expense';
	data?: Expense | Income;
	loading: boolean;
}

interface Categories {
	[key: string]: string;
}
export const categories: Categories = {
	income: 'Inkomst',
	home: 'Hem',
	entertainment: 'Nöjen',
	shopping: 'Shopping',
	savings: 'Sparande',
	transportation: 'Transport',
	other: 'Övrigt',
};

export const FinanceBox: React.FC<FinanceBoxProps> = ({
	className,
	category,
	data = {
		title: '',
		amount: 0,
		id: '',
		categoryType: { category: 'other' },
		monthlyTransaction: false,
	},
	loading,
}) => {
	let IconComponent = null;
	if (!loading) {
		IconComponent =
			Icons[
				capitalizeFirstLetter(data.categoryType.category) as keyof typeof Icons
			];
	}

	return (
		<ContentBox className={classNames(styles.finance_box, className)}>
			<div className={classNames(styles.finance_box_left)}>
				{!loading ? (
					<IconCircle style={data.categoryType.category} size="sm">
						<IconComponent />
					</IconCircle>
				) : (
					<IconCircle size="sm" loading={loading}>
						<></>
					</IconCircle>
				)}
				<span
					className={classNames(
						styles.finance_box_text,
						styles.finance_box_text__light,
						loading && 'u-skeleton-text u-skeleton-text--medium'
					)}
				>
					{categories[data.categoryType.category]}
				</span>
				<span
					className={classNames(
						styles.finance_box_text,
						loading && 'u-skeleton-text u-skeleton-text--short'
					)}
				>
					{data.title}
				</span>
			</div>
			<div className={classNames(styles.finance_box_right)}>
				<span
					className={classNames(
						styles.finance_box_text,
						loading && 'u-skeleton-text u-skeleton-text--short'
					)}
				>
					{category === 'expense' && '- '}
					{formatCost(data.amount)} kr
				</span>
				<EditButton
					className={classNames(styles.finance_box_icon)}
					url={
						category === 'income' ? '/modal/editIncome' : '/modal/editExpense'
					}
					data={data}
					loading={loading}
				/>
				<DeleteButton
					className={classNames(styles.finance_box_icon)}
					url={
						category === 'income'
							? '/modal/deleteIncome'
							: '/modal/deleteExpense'
					}
					data={data}
					loading={loading}
				/>
			</div>
		</ContentBox>
	);
};
