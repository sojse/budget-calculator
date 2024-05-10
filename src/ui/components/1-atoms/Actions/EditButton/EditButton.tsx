'use client';
import React from 'react';
import classNames from 'classnames';
import styles from './EditButton.module.scss';
import Pen from '@/ui/icons/icon-pen.svg';
import { useRouter } from 'next/navigation';
import { useBudgetId } from '@/hooks/useBudgetId';
import { Expense, Income } from '@/context/budgetIdContext';

export interface EditButtonProps {
	className?: string;
	url: string;
	data: Income | Expense;
}

export const EditButton: React.FC<EditButtonProps> = ({
	className,
	url,
	data,
}) => {
	const router = useRouter();
	const { setData } = useBudgetId();
	const handleClick = () => {
		setData({
			title: data.title,
			amount: data.amount,
			monthlyTransaction: data.monthlyTransaction,
			id: data.id,
			categoryType: data.categoryType
				? data.categoryType
				: { category: 'income' },
		});
		router.push(url);
	};
	return (
		<button
			className={classNames(styles.edit_button)}
			onClick={handleClick}
			aria-label="edit"
		>
			<Pen className={classNames(styles.edit_button_icon, className)} />
		</button>
	);
};
