'use client';
import React, { useEffect } from 'react';
import classNames from 'classnames';
import styles from './FinanceCreateButton.module.scss';
import { ContentBox, LinkComponent } from '@/ui/components';
import { useRouter } from 'next/navigation';
import { useBudgetId } from '@/hooks/useBudgetId';

export interface FinanceCreateButtonProps {
	className?: string;
	category: 'income' | 'expense';
	budgetId: string;
	loading: boolean;
}

export const FinanceCreateButton: React.FC<FinanceCreateButtonProps> = ({
	className,
	category,
	budgetId,
	loading,
}) => {
	const router = useRouter();
	const { setCurrentBudgetId } = useBudgetId();

	useEffect(() => {
		setCurrentBudgetId(budgetId);
	}, []);

	const navigate = () => {
		if (category === 'income') {
			router.push('/modal/createIncome', { scroll: false });
		} else {
			router.push('/modal/createExpense', { scroll: false });
		}
	};
	return (
		<ContentBox>
			<button
				className={classNames(
					styles.finance_button,
					styles[`finance_button__${category}`],
					loading && styles.finance_button__disabled,
					className
				)}
				onClick={navigate}
				disabled={loading}
				aria-disabled={loading}
			>
				<LinkComponent
					asText
					url=""
					style="primary"
					className={classNames(styles.finance_button_text)}
				>
					{category === 'income' ? '+ Lägg till inkomst' : '+ Lägg till utgift'}
				</LinkComponent>
			</button>
		</ContentBox>
	);
};
