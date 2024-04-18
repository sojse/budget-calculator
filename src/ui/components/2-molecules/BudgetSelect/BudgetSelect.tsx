'use client';
import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './BudgetSelect.module.scss';
import { FormfieldSelect } from '@/ui/components';
import { getMonthData } from '@/app/actions';
import { useRouter, usePathname } from 'next/navigation';

export interface BudgetSelectProps {
	className?: string;
	budgetInformation: {
		years: { value: string; caption: string }[];
		months: { value: string; caption: string }[];
		selected: {
			monthIndex: number;
			yearIndex: number;
		};
	};
}

export const BudgetSelect: React.FC<BudgetSelectProps> = ({
	className,
	budgetInformation,
}) => {
	const [months, setMonths] = useState(budgetInformation.months);
	const [selectedYear, setSelectedYear] = useState(
		budgetInformation.years[budgetInformation.selected.yearIndex].caption
	);
	const [defaultValue, setDefautlValue] = useState(
		months[budgetInformation.selected.monthIndex].value
	);
	const router = useRouter();
	const pathName = usePathname();

	const fetchNewBudgets = async (e: any) => {
		const newMonths = await getMonthData(e.target.value);
		setMonths(newMonths);
		setDefautlValue('Välj budget');
		setSelectedYear(e.target.value);
	};

	const changeCurrentBudget = (e: any) => {
		const budgetString = e.target.value.toString().toLowerCase();
		const pathSegments = pathName.split('/');
		var basePath: string;

		if (pathSegments.length > 2) {
			basePath = `${pathSegments[0]}/${pathSegments[1]}`;
		} else {
			basePath = pathName;
		}
		const newPath = `${basePath}/${budgetString}/${selectedYear}`;
		router.push(newPath);
	};

	return (
		<form className={classNames(styles.budget_select, className)}>
			<FormfieldSelect
				id={'Year'}
				label={'Year'}
				options={budgetInformation.years}
				state={{ hiddenLabel: true }}
				defaultValue={
					budgetInformation.years[budgetInformation.selected.yearIndex].value
				}
				onChange={fetchNewBudgets}
			/>
			<FormfieldSelect
				id={'Budget'}
				label={'Budget'}
				options={months}
				state={{ hiddenLabel: true }}
				defaultValue={defaultValue}
				onChange={changeCurrentBudget}
			/>
		</form>
	);
};
