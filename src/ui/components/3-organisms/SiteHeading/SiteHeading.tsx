import React from 'react';
import classNames from 'classnames';
import styles from './SiteHeading.module.scss';
import {
	BudgetSelect,
	ContentSection,
	DynamicHeader,
	IconCircle,
	LinkComponent,
} from '@/ui/components';
import Wallet from '@/ui/icons/icon-wallet.svg';
import { fetchBudgets } from '@/lib/api/budget';

export interface SiteHeadingProps {
	className?: string;
	year: string;
}

export const SiteHeading: React.FC<SiteHeadingProps> = async ({ className, year }) => {
	const budgetInformation = await fetchBudgets(year);

	return (
		<ContentSection
			width="Wide"
			className={classNames(styles.site_heading, className)}
		>
			<div className={classNames(styles.site_heading__left)}>
				<IconCircle style="secondary" size="lg">
					<Wallet className={classNames(styles.site_heading_icon)} />
				</IconCircle>
				<DynamicHeader
					defaultString={`${budgetInformation.months[budgetInformation.months.length - 1].caption} ${budgetInformation.years[budgetInformation.years.length - 1].caption}`}
				/>
			</div>
			<div className={classNames(styles.site_heading__right)}>
				<LinkComponent
					style="primary"
					asButton
					width="maxMobile"
					url="/modal/createBudget"
				>
					Skapa ny budget
				</LinkComponent>
				<BudgetSelect budgetInformation={budgetInformation} />
			</div>
		</ContentSection>
	);
};
