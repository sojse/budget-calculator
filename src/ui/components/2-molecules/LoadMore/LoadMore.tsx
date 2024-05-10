'use client';
import React from 'react';
import { useState } from 'react';
import { Button } from '@/ui/components';

export interface LoadMoreProps {
	children: React.ReactNode;
	visibleElements: number;
}

export const LoadMore: React.FC<LoadMoreProps> = ({
	children,
	visibleElements,
}) => {
	const [showAll, setShowAll] = useState(false);
	const shouldShowButton = React.Children.count(children) > visibleElements;

	const handleLoadMore = () => {
		setShowAll(!showAll);
	};
	return (
		<>
			{showAll ? (
				<>
					{children}
					{shouldShowButton && (
						<li>
							<Button onClick={handleLoadMore} style="primary">
								Visa mindre
							</Button>
						</li>
					)}
				</>
			) : (
				<>
					{React.Children.toArray(children).slice(0, visibleElements)}
					{shouldShowButton && (
						<li>
							<Button
								onClick={handleLoadMore}
								style="primary"
								width="maxMobile"
							>
								Visa mer
							</Button>
						</li>
					)}
				</>
			)}
		</>
	);
};
