'use client';
import classNames from 'classnames';
import styles from './BudgetOverview.module.scss';
import {
	BarChart,
	ChartData,
	Heading,
	InformationMessage,
	LinkComponent,
} from '@/ui/components';
import { formatCost } from '@/helpers/number';
import { useEffect } from 'react';

export interface BudgetOverviewProps {
	chartData: ChartData;
}

export const BudgetOverview: React.FC<BudgetOverviewProps> = ({
	chartData,
}) => {
	const income = chartData.datasets[0].data[0];
	const expense = chartData.datasets[0].data[1];
	const totalAmount = income - expense;

	return (
		<div className={classNames(styles.budget_overview)}>
			<Heading headingLevel={'h2'} style="md" color="dark">
				Översikt
			</Heading>
			<div className={classNames(styles.budget_overview_chart)}>
				<BarChart chartData={chartData} showLabels={false} horizontal={true} />
				<div className={classNames(styles.budget_overview_chart_text)}>
					<span>{formatCost(income)}</span>
					<span>- {formatCost(expense)}</span>
				</div>
			</div>
			<span className={classNames(styles.budget_overview_sum)}>
				<span>Summa:</span>
				<span className={classNames(styles.budget_overview_amount)}>
					{formatCost(totalAmount)} kr
				</span>
			</span>
			{totalAmount >= 0 ? (
				<InformationMessage
					style="positive"
					message="Hushållet har ett överskott"
				/>
			) : (
				<InformationMessage
					style="negative"
					message="Hushållet har ett underskott"
				/>
			)}

			<LinkComponent style="primary" url={'#'}>
				Se detaljerat resultat
			</LinkComponent>
		</div>
	);
};
