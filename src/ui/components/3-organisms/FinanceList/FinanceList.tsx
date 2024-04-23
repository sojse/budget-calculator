import React from 'react';
import classNames from 'classnames';
import styles from './FinanceList.module.scss';
import {
	ContentBox,
	ContentSection,
	Heading,
	FinanceBox,
	FinanceBoxProps,
} from '@/ui/components';

export interface FinanceListProps {
	className?: string;
	listType: 'income' | 'expense';
	listObjects: FinanceBoxProps[];
}

export const FinanceList: React.FC<FinanceListProps> = async ({
	className,
	listType,
	listObjects,
}) => {
	return (
		<ContentSection
			width="Full width"
			className={classNames(styles.finance_list)}
		>
			<Heading headingLevel={'h2'} style="md" color="dark">
				{listType === 'income' ? 'Inkomster' : 'Utgifter'}
			</Heading>
			<ContentBox
				className={classNames(
					styles.finance_list_add_container,
					styles[`finance_list_add_container__${listType}`]
				)}
			>
				+ Lägg till inkomst
			</ContentBox>
			<ul className={classNames(styles.finance_list_list)}>
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
			</ul>
		</ContentSection>
	);
};
