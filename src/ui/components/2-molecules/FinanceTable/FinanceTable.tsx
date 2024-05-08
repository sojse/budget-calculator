import React from 'react';
import classNames from 'classnames';
import styles from './FinanceTable.module.scss';
import { Expense, Income } from '@/context/budgetIdContext';
import { formatCost } from '@/helpers/number';

export interface FinanceTableProps {
	className?: string;
	data: Income[] | Expense[];
	totalAmount: number;
}

export const FinanceTable: React.FC<FinanceTableProps> = ({
	className,
	data,
	totalAmount,
}) => {
	return (
		<table className={classNames(styles.finance_table, className)}>
			{data.map((item, index) => (
				<tr className={classNames(styles.finance_table_row)} key={index}>
					<th className={classNames(styles.finance_table_left)}>
						{item.title}
					</th>
					<td className={classNames(styles.finance_table_right)}>
						{formatCost(item.amount)} kr
					</td>
				</tr>
			))}
			<tr className={classNames(styles.finance_table_row)}>
				<th className={classNames(styles.finance_table_left)}>Totalt</th>
				<td className={classNames(styles.finance_table_right)}>
					{formatCost(totalAmount)} kr
				</td>
			</tr>
		</table>
	);
};
