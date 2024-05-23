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
import { fetchBudgets } from '@/lib/api/budget/fetch';

export interface SiteHeadingProps {
	className?: string;
	year: string;
	loading?: boolean;
}

export const SiteHeading: React.FC<SiteHeadingProps> = async ({
	className,
	year,
	loading = false,
}) => {
	let budgetInformation = {
		months: [{ caption: '', value: '', index: 0 }],
		years: [{ caption: '', value: '' }],
	};
	let defaultString = 'Laddar...';
	if (!loading) {
		budgetInformation = await fetchBudgets(year);
		defaultString = `${budgetInformation.months[budgetInformation.months.length - 1].caption} ${budgetInformation.years[budgetInformation.years.length - 1].caption}`;
	}

	return (
		<ContentSection
			width="Wide"
			className={classNames(styles.site_heading, className)}
		>
			<div className={classNames(styles.site_heading__left)}>
				<IconCircle style="secondary" size="lg">
					<Wallet className={classNames(styles.site_heading_icon)} />
				</IconCircle>
				<DynamicHeader defaultString={defaultString} loading={loading} />
			</div>
			<div className={classNames(styles.site_heading__right)}>
				<LinkComponent
					style="primary"
					asButton
					width="maxMobile"
					url="/modal/createBudget"
					scroll={false}
					disabled={loading}
				>
					Skapa ny budget
				</LinkComponent>
				<BudgetSelect budgetInformation={budgetInformation} loading={loading} />
			</div>
		</ContentSection>
	);
};
