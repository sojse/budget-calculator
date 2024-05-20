import React from 'react';
import classNames from 'classnames';
import styles from './FinanceList.module.scss';
import {
	ContentSection,
	FinanceBox,
	FinanceBoxProps,
	FinanceCreateButton,
	LoadMore,
} from '@/ui/components';
import { fetchBudget } from '@/lib/api/budget/fetch';

export interface FinanceListProps {
	listType: 'income' | 'expense';
	slug: string[];
	loading?: boolean;
}

export const FinanceList: React.FC<FinanceListProps> = async ({
	listType,
	slug,
	loading = false,
}) => {
	let budgetData = {
		budgetId: '',
		incomes: [],
		expenses: [],
	};
	let listObjects = new Array(3).fill(0);

	if (!loading) {
		budgetData = await fetchBudget(slug);
		listObjects =
			listType === 'income' ? budgetData.incomes : budgetData.expenses;
	}

	return (
		<ContentSection
			width="Full width"
			className={classNames(styles.finance_list)}
		>
			<ul className={classNames(styles.finance_list_list)}>
				<li>
					<FinanceCreateButton
						category={listType}
						budgetId={budgetData.budgetId}
						loading={loading}
					/>
				</li>
				<LoadMore visibleElements={3}>
					{loading
						? listObjects.map((item: any, index: number) => (
								<li key={index}>
									<FinanceBox category={listType} loading={loading} />
								</li>
							))
						: listObjects.map((item: FinanceBoxProps, index: number) => {
								return (
									<li key={index}>
										<FinanceBox
											category={listType}
											data={item.data}
											loading={loading}
										/>
									</li>
								);
							})}
				</LoadMore>
			</ul>
		</ContentSection>
	);
};
