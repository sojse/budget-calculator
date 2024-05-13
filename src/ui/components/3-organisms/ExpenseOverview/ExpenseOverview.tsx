import classNames from 'classnames';
import styles from './ExpenseOverview.module.scss';
import {
	ExpenseOverviewChart,
	Heading,
	StaticSiteHeading,
} from '@/ui/components';
import { Suspense } from 'react';

export interface ExpenseOverviewProps {
	slug: string[];
}

export const ExpenseOverview: React.FC<ExpenseOverviewProps> = ({ slug }) => {
	return (
		<div className={classNames(styles.expense_overview)}>
			<StaticSiteHeading>Översikt</StaticSiteHeading>
			<Suspense fallback={<div>Loading...</div>}>
				<ExpenseOverviewChart slug={slug} />
			</Suspense>
		</div>
	);
};
