import {
	fetchStaticParams,
	getBudgetWithCategoryDetails,
} from '@/lib/api/budget';
import { SiteHeading, TwoColumnLayout, ExpenseOverview } from '@/ui/components';

/*
export async function generateStaticParams() {
	const mappedData = await fetchStaticParams();
	return mappedData;
}*/

export default async function Finance({
	params,
}: {
	params: { slug: string[] };
}) {
	const year = params.slug ? params.slug[1] : '';
	return (
		<>
			<SiteHeading year={year} />
			<TwoColumnLayout
				column1={
					<>
						<div>hej</div>
					</>
				}
				column2={<ExpenseOverview slug={params.slug} />}
			/>
		</>
	);
}
