'use client';
import React from 'react';
import classNames from 'classnames';
import styles from './EditButton.module.scss';
import Pen from '@/ui/icons/icon-pen.svg';
import { useRouter } from 'next/navigation';
import { useBudgetId } from '@/hooks/useBudgetId';
import { Income } from '@/context/budgetIdContext';

export interface EditButtonProps {
	className?: string;
	url: string;
	income: Income;
}

export const EditButton: React.FC<EditButtonProps> = ({
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
		});
		router.push(url);
	};
	return (
		<button className={classNames(styles.edit_button)} onClick={handleClick}>
			<Pen className={classNames(styles.edit_button_icon, className)} />
		</button>
	);
};
