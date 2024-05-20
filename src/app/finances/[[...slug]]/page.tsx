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
			<Suspense fallback={<SiteHeading year={year} loading={true} />}>
				<SiteHeading year={year} />
			</Suspense>
			<TwoColumnLayout
				column1={
					<>
						<StaticSiteHeading>Utgifter</StaticSiteHeading>
						<Suspense
							fallback={
								<FinanceList listType={'expense'} slug={params.slug} loading />
							}
						>
							<FinanceList slug={params.slug} listType={'expense'} />
						</Suspense>

						<StaticSiteHeading>Inkomster</StaticSiteHeading>
						<Suspense
							fallback={
								<FinanceList listType={'income'} slug={params.slug} loading />
							}
						>
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
