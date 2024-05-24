import {
	ContentBox,
	ScrollChartSection,
	StaticSectionHeading,
} from '@/ui/components';
import classNames from 'classnames';
import styles from './OverviewChart.module.scss';
import { Suspense } from 'react';

export default interface OverviewChartProps {
	year: string;
}

export const OverviewChart: React.FC<OverviewChartProps> = async ({ year }) => {
	return (
		<ContentBox className={classNames(styles.overview_chart_section)}>
			<StaticSectionHeading>Översikt</StaticSectionHeading>
			<Suspense fallback={<ScrollChartSection year={year} loading />}>
				<ScrollChartSection year={year} />
			</Suspense>
		</ContentBox>
	);
};
