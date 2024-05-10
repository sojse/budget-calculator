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
		<div className={classNames(styles.finance_table_container)}>
			<table className={classNames(styles.finance_table, className)}>
				{data.map((item, index) => (
					<tbody key={index}>
						<tr className={classNames(styles.finance_table_row)}>
							<th className={classNames(styles.finance_table_left)}>
								{item.title}
							</th>
							<td className={classNames(styles.finance_table_right)}>
								{formatCost(item.amount)} kr
							</td>
						</tr>
					</tbody>
				))}
				<tbody>
					<tr className={classNames(styles.finance_table_row_last)}>
						<th className={classNames(styles.finance_table_left)}>Totalt</th>
						<td className={classNames(styles.finance_table_right)}>
							{formatCost(totalAmount)} kr
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};
