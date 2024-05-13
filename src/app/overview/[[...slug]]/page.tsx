import { SiteHeading } from '@/ui/components';
import { Suspense } from 'react';

export default function Overview({ params }: { params: { slug: string[] } }) {
	const year = params.slug ? params.slug[1] : '';
	return (
		<>
			<Suspense fallback={<div>Loading...</div>}>
				<SiteHeading year={year} />
			</Suspense>
			<div>Overview</div>
		</>
	);
}
