import {
	BudgetOverview,
	FinanceSection,
	SiteHeading,
	TwoColumnLayout,
} from '@/ui/components';
import { Suspense } from 'react';

export default function Finance({ params }: { params: { slug: string[] } }) {
	const year = params.slug ? params.slug[1] : '';

	return (
		<>
			<Suspense fallback={<SiteHeading year={year} loading={true} />}>
				<SiteHeading year={year} />
			</Suspense>
			<TwoColumnLayout
				column1={
					<>
						<FinanceSection listType={'expense'} slug={params.slug} />
						<FinanceSection listType={'income'} slug={params.slug} />
					</>
				}
				column2={<BudgetOverview slug={params.slug} />}
			/>
		</>
	);
}
