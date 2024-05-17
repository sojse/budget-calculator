import React from 'react';
import { AccordionItem, AccordionItemProps } from '@/ui/components';
import { getFinanceDetailData } from '@/lib/api/expense/fetch';
import classNames from 'classnames';
import styles from './FinanceAccordion.module.scss';

export interface FinanceAccordionProps {
	slug: string[];
	loading?: boolean;
}

export const FinanceAccordion: React.FC<FinanceAccordionProps> = async ({
	slug,
	loading = false,
}) => {
	var budgetData = new Array(6).fill(0);
	if (!loading) {
		budgetData = await getFinanceDetailData(slug);
	}

	return (
		<ul className={classNames(styles.finance_accordion)}>
			{budgetData.map((item: AccordionItemProps, index: number) => (
				<li key={index}>
					<AccordionItem
						data={item.data}
						categoryType={item.categoryType}
						amount={item.amount}
						loading={loading}
					/>
				</li>
			))}
		</ul>
	);
};
