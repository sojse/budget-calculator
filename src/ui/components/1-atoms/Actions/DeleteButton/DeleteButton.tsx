'use client';
import React from 'react';
import classNames from 'classnames';
import styles from './DeleteButton.module.scss';
import Trash from '@/ui/icons/icon-trash.svg';
import { useRouter } from 'next/navigation';
import { useBudgetId } from '@/hooks/useBudgetId';
import { Income } from '@/context/budgetIdContext';

export interface DeleteButtonProps {
	className?: string;
	url: string;
	income: Income;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({
	className,
	url,
	income,
}) => {
	const router = useRouter();
	const { setIncome } = useBudgetId();
	const handleClick = () => {
		setIncome({
			title: income.title,
			amount: income.amount,
			monthlyTransaction: income.monthlyTransaction,
			id: income.id,
			categoryType: income.categoryType,
		});
		router.push(url);
	};
	return (
		<button className={classNames(styles.delete_button)} onClick={handleClick}>
			<Trash className={classNames(styles.delete_button_icon, className)} />
		</button>
	);
};
