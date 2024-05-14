import React from 'react';
import classNames from 'classnames';
import styles from './FinanceAccordion.module.scss';
import { AccordionItem, AccordionItemProps, Heading } from '@/ui/components';
import { getFinanceDetailData } from '@/lib/api/expense/fetch';

export interface FinanceAccordionProps {
	slug: string[];
}

export const FinanceAccordion: React.FC<FinanceAccordionProps> = async ({
	slug,
}) => {
	const budgetData = await getFinanceDetailData(slug);

	return (
		<>
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
