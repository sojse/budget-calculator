import { fetchStaticParams } from '@/lib/api/budget';
import { SiteHeading } from '@/ui/components';

/*
export async function generateStaticParams() {
	const mappedData = await fetchStaticParams();
	return mappedData;
}*/

export default function Overview({ params }: { params: { slug: string[] } }) {
	const year = params.slug ? params.slug[1] : '';
	return (
		<>
			<SiteHeading year={year} />
			<div>Overview</div>
		</>
	);
}
