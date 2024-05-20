import { FinanceList, StaticSectionHeading } from '@/ui/components';
import { Suspense } from 'react';

export default interface FinanceSectionProps {
	slug: string[];
	listType: 'income' | 'expense';
}

export const FinanceSection: React.FC<FinanceSectionProps> = async ({
	listType,
	slug,
}) => {
	return (
		<>
			<StaticSectionHeading>
				{listType === 'income' ? 'Inkomster' : 'Utgifter'}
			</StaticSectionHeading>
			<Suspense
				fallback={<FinanceList listType={listType} slug={slug} loading />}
			>
				<FinanceList slug={slug} listType={listType} />
			</Suspense>
		</>
	);
};
