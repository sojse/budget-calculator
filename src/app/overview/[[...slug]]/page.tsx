import { SiteHeading, OverviewChart, TwoColumnLayout } from '@/ui/components';
import { Suspense } from 'react';

export default function Overview({ params }: { params: { slug: string[] } }) {
	const year = params.slug ? params.slug[1] : '';
	return (
		<>
			<Suspense fallback={<SiteHeading year={year} loading={true} />}>
				<SiteHeading year={year} />
			</Suspense>
			<TwoColumnLayout
				column1={<OverviewChart year={year} />}
				column2={<div>Second column</div>}
			/>
		</>
	);
}
