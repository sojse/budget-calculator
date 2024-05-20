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
	loading: boolean;
}

export const EditButton: React.FC<EditButtonProps> = ({
	className,
	url,
	data,
	loading,
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
			className={classNames(styles.edit_button, loading && 'u-skeleton-circle')}
			onClick={handleClick}
			disabled={loading}
			aria-label="edit"
		>
			{!loading && (
				<Pen className={classNames(styles.edit_button_icon, className)} />
			)}
		</button>
	);
};
