'use client';
import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './AccordionItem.module.scss';
import { formatCost } from '@/helpers/number';
import * as Icons from '@/ui/icons';
import Chevron from '@/ui/icons/icon-chevron.svg';
import { IconCircle, ContentBox, categories } from '@/ui/components';
import { capitalizeFirstLetter } from '@/helpers/string';
import { CategoryType } from '@/context/budgetIdContext';

export interface AccordionItemProps {
	className?: string;
	categoryType: CategoryType;
	amount: number;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
	amount,
	className,
	categoryType,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const IconComponent =
		Icons[capitalizeFirstLetter(categoryType.category) as keyof typeof Icons];

	return (
		<button
			className={classNames(styles.accordion_item_button)}
			onClick={() => setIsOpen(!isOpen)}
		>
			<ContentBox className={classNames(styles.accordion_item, className)}>
				<div className={classNames(styles.accordion_item_content)}>
					<IconCircle style={categoryType.category} size="sm">
						<IconComponent />
					</IconCircle>
					<span
						className={classNames(
							styles.accordion_item_text,
							styles.accordion_item_text__light
						)}
					>
						{categories[categoryType.category]}
					</span>
					<span className={classNames(styles.accordion_item_text)}>
						{categoryType.category !== 'income' && '- '}
						{formatCost(amount)} kr
					</span>
				</div>

				<Chevron
					className={classNames(
						styles.accordion_item_icon,
						isOpen && styles.accordion_item_icon__open
					)}
				/>
			</ContentBox>
		</button>
	);
};
