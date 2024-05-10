'use client';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './BudgetSelect.module.scss';
import { FormfieldSelect } from '@/ui/components';
import { getMonthData } from '@/app/actions';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { capitalizeFirstLetter } from '@/helpers/string';

export interface BudgetSelectProps {
	budgetInformation: {
		years: { value: string; caption: string }[];
		months: { value: string; caption: string }[];
	};
}

export const BudgetSelect: React.FC<BudgetSelectProps> = ({
	budgetInformation,
}) => {
	const params = useParams();
	const router = useRouter();
	const pathName = usePathname();
	const placeHolderValue = 'Välj budget';
	const [months, setMonths] = useState(budgetInformation.months);
	const [selectedYear, setSelectedYear] = useState(
		params.slug
			? params.slug[1]
			: budgetInformation.years[budgetInformation.years.length - 1].value
	);
	const [selectedBudget, setSelectedBudget] = useState(
		params.slug
			? params.slug[0]
			: budgetInformation.months[budgetInformation.months.length - 1].value
	);

	useEffect(() => {
		setMonths(budgetInformation.months);
		setSelectedBudget(
			params.slug && !params.id
				? params.slug[0]
				: budgetInformation.months[budgetInformation.months.length - 1].value
		);
	}, [budgetInformation]);

	const fetchNewBudgets = async (e: any) => {
		setSelectedYear(e.target.value);
		const newMonths = await getMonthData(e.target.value);
		setMonths(newMonths);
		setSelectedBudget(placeHolderValue);
	};

	const changeCurrentBudget = (e: any) => {
		setSelectedBudget(e.target.value);
		const budgetString = e.target.value.toString().toLowerCase();
		const pathSegments = pathName.split('/');
		var basePath: string;

		if (pathSegments.length > 2) {
			basePath = `${pathSegments[0]}/${pathSegments[1]}`;
		} else {
			basePath = pathName;
		}
		const newPath = `${basePath}/${budgetString}/${selectedYear}`;
		router.push(newPath, { scroll: false });
	};

	return (
		<form className={classNames(styles.budget_select)}>
			<FormfieldSelect
				id={'Year'}
				label={'Year'}
				options={budgetInformation.years}
				state={{ hiddenLabel: true }}
				value={selectedYear}
				placeHolderValue="Välj år"
				onChange={fetchNewBudgets}
			/>
			<FormfieldSelect
				id={'Budget'}
				label={'Budget'}
				options={months}
				state={{ hiddenLabel: true }}
				value={selectedBudget}
				placeHolderValue={placeHolderValue}
				onChange={changeCurrentBudget}
			/>
		</form>
	);
};
