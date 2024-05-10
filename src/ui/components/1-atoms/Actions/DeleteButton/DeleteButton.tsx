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
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({
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
			categoryType: data.categoryType,
		});
		router.push(url);
	};
	return (
		<button
			className={classNames(styles.delete_button)}
			onClick={handleClick}
			aria-label="delete"
		>
			<Trash className={classNames(styles.delete_button_icon, className)} />
		</button>
	);
};
