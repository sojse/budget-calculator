'use client';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './BudgetSelect.module.scss';
import { FormfieldSelect } from '@/ui/components';
import { getMonthData } from '@/app/actions';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { useBudgetId } from '@/hooks/useBudgetId';

export interface BudgetSelectProps {
	budgetInformation?: {
		years: { value: string; caption: string }[];
		months: { value: string; caption: string; index: number }[];
	};
	loading: boolean;
}

export const BudgetSelect: React.FC<BudgetSelectProps> = ({
	budgetInformation = {
		years: [{ value: '', caption: '' }],
		months: [{ value: '', caption: '' }],
	},
	loading = false,
}) => {
	const params = useParams();
	const router = useRouter();
	const pathName = usePathname();
	const { setSelectedIndex } = useBudgetId();
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
	if (!loading) {
		useEffect(() => {
			setMonths(budgetInformation.months);
			setSelectedBudget(
				params.slug && !params.id
					? params.slug[0]
					: budgetInformation.months[budgetInformation.months.length - 1].value
			);
			const selectElement =
				document.querySelector<HTMLSelectElement>('#Budget');
			const selectedIndex = selectElement?.selectedIndex;
			if (selectedIndex) {
				setSelectedIndex(selectedIndex);
			}
		}, [budgetInformation]);
	}

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
		let basePath: string;

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
			{loading ? (
				<>
					<FormfieldSelect
						id={'Year'}
						label={'Year'}
						options={[]}
						state={{ hiddenLabel: true, disabled: true }}
					/>
					<FormfieldSelect
						id={'Budget'}
						label={'Budget'}
						options={[]}
						state={{ hiddenLabel: true, disabled: true }}
					/>
				</>
			) : (
				<>
					<FormfieldSelect
						id={'Year'}
						label={'Year'}
						options={budgetInformation.years}
						state={{ hiddenLabel: true, disabled: loading }}
						value={selectedYear}
						placeHolderValue="Välj år"
						onChange={fetchNewBudgets}
					/>
					<FormfieldSelect
						id={'Budget'}
						label={'Budget'}
						options={months}
						state={{ hiddenLabel: true, disabled: loading }}
						value={selectedBudget}
						placeHolderValue={placeHolderValue}
						onChange={changeCurrentBudget}
					/>
				</>
			)}
		</form>
	);
};
