import {
	FinanceAccordion,
	FinanceList,
	StaticSectionHeading,
} from '@/ui/components';
import { Suspense } from 'react';

export default interface ExpenseDetailSectionProps {
	slug: string[];
}

export const ExpenseDetailSection: React.FC<
	ExpenseDetailSectionProps
> = async ({ slug }) => {
	return (
		<>
			<StaticSectionHeading>Detaljer</StaticSectionHeading>
			<Suspense fallback={<FinanceAccordion slug={slug} loading />}>
				<FinanceAccordion slug={slug} />
			</Suspense>
		</>
	);
};
