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
}

export const FinanceCreateButton: React.FC<FinanceCreateButtonProps> = ({
	className,
	category,
	budgetId,
}) => {
	const router = useRouter();
	const { setCurrentBudgetId } = useBudgetId();

	useEffect(() => {
		setCurrentBudgetId(budgetId);
	}, []);

	const navigate = () => {
		router.push('/modal/createIncome');
	};
	return (
		<ContentBox>
			<button
				className={classNames(styles.finance_button, className)}
				onClick={navigate}
			>
				<LinkComponent
					asText
					url=""
					style="primary"
					className={classNames(styles.finance_button_text)}
				>
					+ Lägg till inkomst
				</LinkComponent>
			</button>
		</ContentBox>
	);
};
