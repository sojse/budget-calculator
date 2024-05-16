import {
	SiteHeading,
	TwoColumnLayout,
	ExpenseOverview,
	FinanceAccordion,
	StaticSiteHeading,
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
						<StaticSiteHeading>Detaljer</StaticSiteHeading>
						<Suspense
							fallback={<FinanceAccordion slug={params.slug} loading />}
						>
							<FinanceAccordion slug={params.slug} />
						</Suspense>
					</>
				}
				column2={
					<>
						<ExpenseOverview slug={params.slug} />
					</>
				}
			/>
		</>
	);
}
