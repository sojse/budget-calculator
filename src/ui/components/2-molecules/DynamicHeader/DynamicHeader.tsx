'use client';
import React, { useEffect } from 'react';
import { Heading } from '@/ui/components';
import { useParams, usePathname } from 'next/navigation';
import { buildBudgetTitle } from '@/helpers/string';
import { useBudgetId } from '@/hooks/useBudgetId';

export interface DynamicHeaderProps {
	defaultString: string;
	loading?: boolean;
}

export const DynamicHeader: React.FC<DynamicHeaderProps> = ({
	defaultString,
	loading = false,
}) => {
	const params = useParams();
	const pathName = usePathname();
	const { setCurrentPathName } = useBudgetId();
	let title: string;

	useEffect(() => {
		if (!pathName.includes('modal')) {
			setCurrentPathName(pathName);
		}
	}, []);

	if (params.slug === undefined) {
		title = defaultString;
	} else {
		title = buildBudgetTitle(params.slug[0], params.slug[1]);
	}

	return (
		<Heading headingLevel="h1" color="primary" style="lg">
			{loading ? 'Laddar...' : title}
		</Heading>
	);
};
