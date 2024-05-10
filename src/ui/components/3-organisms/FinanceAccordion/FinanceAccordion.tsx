import React from 'react';
import classNames from 'classnames';
import styles from './FinanceAccordion.module.scss';
import { AccordionItem, AccordionItemProps, Heading } from '@/ui/components';
import { getFinanceDetailData } from '@/lib/api/budget';
import { Income, Expense, CategoryType } from '@/context/budgetIdContext';

export interface FinanceAccordionProps {
	slug: string[];
}

export const FinanceAccordion: React.FC<FinanceAccordionProps> = async ({
	slug,
}) => {
	const budgetData = await getFinanceDetailData(slug);

	return (
		<>
			<Heading
				headingLevel={'h2'}
				style="md"
				color="dark"
				className={classNames(styles.finance_accoridon_heading)}
			>
				Detaljer
			</Heading>
			{budgetData.map((item: AccordionItemProps, index: number) => (
				<div key={index}>
					<AccordionItem
						data={item.data}
						categoryType={item.categoryType}
						amount={item.amount}
					/>
				</div>
			))}
		</>
	);
};
