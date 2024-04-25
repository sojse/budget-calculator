'use client';
import React from 'react';
import classNames from 'classnames';
import styles from './FinanceCreateButton.module.scss';
import { ContentBox, LinkComponent } from '@/ui/components';
import { useRouter } from 'next/navigation';

export interface FinanceCreateButtonProps {
	className?: string;
	category: 'income' | 'expense';
}

export const FinanceCreateButton: React.FC<FinanceCreateButtonProps> = async ({
	className,
	category,
}) => {
	const router = useRouter();
	return (
		<ContentBox>
			<button
				className={classNames(styles.finance_button, className)}
				onClick={() => router.push('/modal/createIncome')}
			>
				<LinkComponent asText url="" style="primary">
					+ Lägg till inkomst
				</LinkComponent>
			</button>
		</ContentBox>
	);
};
