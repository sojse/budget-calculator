import React from 'react';
import classNames from 'classnames';
import styles from './FinanceList.module.scss';
import {
	ContentSection,
	Heading,
	FinanceBox,
	FinanceBoxProps,
	FinanceCreateButton,
	LoadMore,
} from '@/ui/components';
import { fetchBudget } from '@/lib/api/budget/fetch';

export interface FinanceListProps {
	listType: 'income' | 'expense';
	slug: string[];
}

export const FinanceList: React.FC<FinanceListProps> = async ({
	listType,
	slug,
}) => {
	const budgetData = await fetchBudget(slug);

	const listObjects =
		listType === 'income' ? budgetData.incomes : budgetData.expenses;

	return (
		<ContentSection
			width="Full width"
			className={classNames(styles.finance_list)}
		>
			<FinanceCreateButton category={listType} budgetId={budgetData.budgetId} />
			<ul className={classNames(styles.finance_list_list)}>
				<LoadMore visibleElements={3}>
					{listObjects.map((item: FinanceBoxProps, index: number) => {
						return (
							<li key={index}>
								<FinanceBox category={listType} data={item.data} />
							</li>
						);
					})}
				</LoadMore>
			</ul>
		</ContentSection>
	);
};
