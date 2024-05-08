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
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
	amount,
	categoryType,
	data,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<AccordionButton
				categoryType={categoryType}
				amount={amount}
				isOpen={isOpen}
				onClick={setIsOpen}
			/>
			<div
				className={classNames(
					styles.accordion_item,
					isOpen && styles.accordion_item__open
				)}
			>
				<FinanceTable data={data} totalAmount={amount} />
			</div>
		</>
	);
};
