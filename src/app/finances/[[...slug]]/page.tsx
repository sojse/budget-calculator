import { fetchBudget, fetchStaticParams } from '@/lib/api';
import { FinanceList, TwoColumnLayout } from '@/ui/components';

export async function generateStaticParams() {
	const mappedData = await fetchStaticParams();
	return mappedData;
}

export default async function Finance({ params }: { params: { slug: string[] } }) {
	const incomeData = await fetchBudget(params.slug);
	return (
		<>
			<TwoColumnLayout
				column1={<FinanceList listType={'income'} listObjects={incomeData} />}
				column2={<div></div>}
			/>
		</>
	);
}
