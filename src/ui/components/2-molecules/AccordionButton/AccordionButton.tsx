'use client';
import React from 'react';
import classNames from 'classnames';
import styles from './AccordionButton.module.scss';
import { formatCost } from '@/helpers/number';
import * as Icons from '@/ui/icons';
import Chevron from '@/ui/icons/icon-chevron.svg';
import { IconCircle, ContentBox, categories } from '@/ui/components';
import { capitalizeFirstLetter } from '@/helpers/string';
import { CategoryType } from '@/context/budgetIdContext';

export interface AccordionButtonProps {
	className?: string;
	categoryType: CategoryType;
	amount: number;
	isOpen: boolean;
	onClick: (openState: boolean) => void;
	loading: boolean;
}

export const AccordionButton: React.FC<AccordionButtonProps> = ({
	amount,
	className,
	categoryType,
	isOpen,
	onClick,
	loading,
}) => {
	let IconComponent = null;

	if (!loading) {
		IconComponent =
			Icons[capitalizeFirstLetter(categoryType.category) as keyof typeof Icons];
	}

	return (
		<button
			className={classNames(
				styles.accordion_button_button,
				loading && styles.accordion_button_button__loading
			)}
			onClick={() => onClick(!isOpen)}
			disabled={loading}
			aria-disabled={loading}
		>
			<ContentBox className={classNames(styles.accordion_button, className)}>
				<div className={classNames(styles.accordion_button_content)}>
					{!loading ? (
						<IconCircle
							style={categoryType.category}
							size="sm"
							loading={loading}
						>
							<IconComponent />
						</IconCircle>
					) : (
						<IconCircle size="sm" loading={loading}>
							<></>
						</IconCircle>
					)}

					<span
						className={classNames(
							styles.accordion_button_text,
							styles.accordion_button_text__light,
							loading && 'u-skeleton-text u-skeleton-text--medium'
						)}
					>
						{!loading && categories[categoryType.category]}
					</span>
					<span
						className={classNames(
							styles.accordion_button_text,
							loading && 'u-skeleton-text u-skeleton-text--short'
						)}
					>
						{!loading && (
							<>
								{categoryType.category !== 'income' && '- '}
								{formatCost(amount)} kr
							</>
						)}
					</span>
				</div>
				{!loading ? (
					<Chevron
						className={classNames(
							styles.accordion_button_icon,
							isOpen && styles.accordion_button_icon__open
						)}
					/>
				) : (
					<div
						className={classNames(
							styles.accordion_button_icon,
							'u-skeleton-circle'
						)}
					></div>
				)}
			</ContentBox>
		</button>
	);
};
