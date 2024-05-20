import {
	SiteHeading,
	TwoColumnLayout,
	ExpenseOverview,
	ExpenseDetailSection,
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
				column1={<ExpenseDetailSection slug={params.slug} />}
				column2={<ExpenseOverview slug={params.slug} />}
			/>
		</>
	);
}
