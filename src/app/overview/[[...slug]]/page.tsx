import { fetchStaticParams } from '@/lib/api/budget';

export async function generateStaticParams() {
	const mappedData = await fetchStaticParams();
	return mappedData;
}

export default function Overview() {
	return (
		<>
			<div>Overview</div>
		</>
	);
}
