import React from 'react';
import { AccordionItem, AccordionItemProps } from '@/ui/components';
import { getFinanceDetailData } from '@/lib/api/expense/fetch';

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
		<>
			{budgetData.map((item: AccordionItemProps, index: number) => (
				<div key={index}>
					<AccordionItem
						data={item.data}
						categoryType={item.categoryType}
						amount={item.amount}
						loading={loading}
					/>
				</div>
			))}
		</>
	);
};
