import {
	ContentBox,
	SpendingDonut,
	StaticSectionHeading,
} from '@/ui/components';
import classNames from 'classnames';
import styles from './SpendingOverview.module.scss';
import { Suspense } from 'react';

export default interface SpendingOverview {
	slug: string[];
}

export const SpendingOverview: React.FC<SpendingOverview> = ({ slug }) => {
	return (
		<section>
			<ContentBox className={classNames(styles.spending_overview_section)}>
				<StaticSectionHeading>Budget</StaticSectionHeading>
				<Suspense fallback={<SpendingDonut slug={slug} loading />}>
					<SpendingDonut slug={slug} />
				</Suspense>
			</ContentBox>
		</section>
	);
};
