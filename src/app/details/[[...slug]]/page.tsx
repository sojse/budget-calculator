import {
	SiteHeading,
	TwoColumnLayout,
	ExpenseOverview,
	FinanceAccordion,
} from '@/ui/components';
import { Suspense } from 'react';

export default function Finance({ params }: { params: { slug: string[] } }) {
	const year = params.slug ? params.slug[1] : '';
	return (
		<>
			<SiteHeading year={year} />
			<TwoColumnLayout
				column1={
					<>
						<Suspense fallback={<div>Loading...</div>}>
							<FinanceAccordion slug={params.slug} />
						</Suspense>
					</>
				}
				column2={
					<>
						<Suspense fallback={<div>Loading...</div>}>
							<ExpenseOverview slug={params.slug} />
						</Suspense>
					</>
				}
			/>
		</>
	);
}
