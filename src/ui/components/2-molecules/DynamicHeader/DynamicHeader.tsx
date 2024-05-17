'use client';
import React from 'react';
import { Heading } from '@/ui/components';
import { useParams } from 'next/navigation';
import { buildBudgetTitle } from '@/helpers/string';

export interface DynamicHeaderProps {
	defaultString: string;
	loading?: boolean;
}

export const DynamicHeader: React.FC<DynamicHeaderProps> = ({
	defaultString,
	loading = false,
}) => {
	const params = useParams();
	let title: string;

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
