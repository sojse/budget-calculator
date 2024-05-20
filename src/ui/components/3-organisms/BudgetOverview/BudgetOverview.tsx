import classNames from 'classnames';
import styles from './BudgetOverview.module.scss';
import { BudgetChart, LinkComponent, StaticSiteHeading } from '@/ui/components';
import { Suspense } from 'react';

export interface BudgetOverviewProps {
	slug: string[];
}

export const BudgetOverview: React.FC<BudgetOverviewProps> = ({ slug }) => {
	const detailUrl = slug ? `/details/${slug.join('/')}` : '/details';

	return (
		<div className={classNames(styles.budget_overview)}>
			<StaticSiteHeading>Översikt</StaticSiteHeading>
			<Suspense fallback={<BudgetChart slug={slug} loading />}>
				<BudgetChart slug={slug} />
			</Suspense>
			<LinkComponent style="primary" url={detailUrl}>
				Se detaljerat resultat
			</LinkComponent>
		</div>
	);
};
