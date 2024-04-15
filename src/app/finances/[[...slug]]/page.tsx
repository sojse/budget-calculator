import { Main, SiteHeading } from '@/ui/components';

export async function generateStaticParams() {
	const mappedData: any[] = [];

	return mappedData;
}

export default async function Finance({
	params,
}: {
	params: { slug: string };
}) {
	return (
		<>
			<div>hej</div>
		</>
	);
}
