import classNames from 'classnames';
import styles from './ExpenseOverview.module.scss';
import { ExpenseOverviewChart, StaticSiteHeading } from '@/ui/components';
import { Suspense } from 'react';

export interface ExpenseOverviewProps {
	slug: string[];
}

export const ExpenseOverview: React.FC<ExpenseOverviewProps> = ({ slug }) => {
	return (
		<div className={classNames(styles.expense_overview)}>
			<StaticSiteHeading>Översikt</StaticSiteHeading>
			<Suspense fallback={<ExpenseOverviewChart slug={slug} loading />}>
				<ExpenseOverviewChart slug={slug} />
			</Suspense>
		</div>
	);
};
