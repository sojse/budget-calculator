'use client';
import React from 'react';
import classNames from 'classnames';
import styles from './DeleteButton.module.scss';
import Trash from '@/ui/icons/icon-trash.svg';
import { useRouter } from 'next/navigation';
import { useBudgetId } from '@/hooks/useBudgetId';
import { Expense, Income } from '@/context/budgetIdContext';

export interface DeleteButtonProps {
	className?: string;
	url: string;
	data: Income | Expense;
	loading: boolean;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({
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
			categoryType: data.categoryType,
		});
		router.push(url);
	};
	return (
		<button
			className={classNames(
				styles.delete_button,
				loading && 'u-skeleton-circle'
			)}
			onClick={handleClick}
			disabled={loading}
			aria-label="delete"
		>
			{!loading && (
				<Trash className={classNames(styles.delete_button_icon, className)} />
			)}
		</button>
	);
};
