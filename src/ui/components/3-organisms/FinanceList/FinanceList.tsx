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

export interface FinanceListProps {
	listType: 'income' | 'expense';
	listObjects: FinanceBoxProps[];
	budgetId: string;
}

export const FinanceList: React.FC<FinanceListProps> = async ({
	listType,
	listObjects,
	budgetId,
}) => {
	return (
		<ContentSection
			width="Full width"
			className={classNames(styles.finance_list)}
		>
			<Heading headingLevel={'h2'} style="md" color="dark">
				{listType === 'income' ? 'Inkomster' : 'Utgifter'}
			</Heading>
			<FinanceCreateButton category={listType} budgetId={budgetId} />

			<ul className={classNames(styles.finance_list_list)}>
				<LoadMore visibleElements={4}>
					{listObjects.map((item: FinanceBoxProps, index: number) => {
						return (
							<li key={index}>
								<FinanceBox
									category={'income'}
									expenseInformation={item.expenseInformation}
								/>
							</li>
						);
					})}
				</LoadMore>
			</ul>
		</ContentSection>
	);
};
