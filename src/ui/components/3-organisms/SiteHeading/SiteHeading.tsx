import React from 'react';
import classNames from 'classnames';
import styles from './SiteHeading.module.scss';
import {
	BudgetSelect,
	Button,
	ContentSection,
	DynamicHeader,
	IconCircle,
} from '@/ui/components';
import Wallet from '@/ui/icons/icon-wallet.svg';
import { fetchYearData } from '@/lib/api';

export interface SiteHeadingProps {
	className?: string;
}

export const SiteHeading: React.FC<SiteHeadingProps> = async ({
	className,
}) => {
	const budgetInformation = await fetchYearData();

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
					defaultString={`${budgetInformation.months[budgetInformation.selected.monthIndex].caption} ${budgetInformation.years[budgetInformation.selected.yearIndex].caption}`}
				/>
			</div>
			<div className={classNames(styles.site_heading__right)}>
				<Button style="primary" width="maxMobile">
					Skapa ny budget
				</Button>
				<BudgetSelect budgetInformation={budgetInformation} />
			</div>
		</ContentSection>
	);
};
