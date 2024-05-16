'use client';
import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './AccordionItem.module.scss';
import { AccordionButton, FinanceTable } from '@/ui/components';
import { CategoryType, Expense, Income } from '@/context/budgetIdContext';

export interface AccordionItemProps {
	data: Income[] | Expense[];
	categoryType: CategoryType;
	amount: number;
	loading: boolean;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
	amount,
	categoryType,
	data,
	loading,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={classNames(styles.accordion_item)}>
			<AccordionButton
				categoryType={categoryType}
				amount={amount}
				isOpen={isOpen}
				onClick={setIsOpen}
				loading={loading}
			/>
			<div
				className={classNames(
					styles.accordion_item_content,
					isOpen && styles.accordion_item_content__open
				)}
			>
				{!loading && <FinanceTable data={data} totalAmount={amount} />}
			</div>
		</div>
	);
};
