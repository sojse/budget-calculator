'use client';
import React from 'react';
import { Heading } from '@/ui/components';
import { useParams } from 'next/navigation';
import { buildBudgetTitle, capitalizeFirstLetter } from '@/helpers/string';

export interface DynamicHeaderProps {
	defaultString: string;
}

export const DynamicHeader: React.FC<DynamicHeaderProps> = ({
	defaultString,
}) => {
	const pathName = useParams();
	var title: string;

	if (pathName.slug === undefined) {
		title = defaultString;
	} else {
		title = buildBudgetTitle(pathName.slug[0], pathName.slug[1]);
	}

	return (
		<Heading headingLevel="h1" color="primary" style="md">
			{title}
		</Heading>
	);
};
