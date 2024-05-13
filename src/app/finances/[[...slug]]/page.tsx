import {
	BudgetOverview,
	FinanceList,
	SiteHeading,
	StaticSiteHeading,
	TwoColumnLayout,
} from '@/ui/components';
import { Suspense } from 'react';

export default function Finance({ params }: { params: { slug: string[] } }) {
	const year = params.slug ? params.slug[1] : '';

	return (
		<>
			<Suspense fallback={<div>Loading...</div>}>
				<SiteHeading year={year} />
			</Suspense>
			<TwoColumnLayout
				column1={
					<>
						<StaticSiteHeading>Utgifter</StaticSiteHeading>
						<Suspense fallback={<div>Loading...</div>}>
							<FinanceList slug={params.slug} listType={'expense'} />
						</Suspense>

						<StaticSiteHeading>Inkomster</StaticSiteHeading>
						<Suspense fallback={<div>Loading...</div>}>
							<FinanceList listType={'income'} slug={params.slug} />
						</Suspense>
					</>
				}
				column2={
					<>
						<BudgetOverview slug={params.slug} />
					</>
				}
			/>
		</>
	);
}
