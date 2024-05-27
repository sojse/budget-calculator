import { DonutChart, LabeledAmount } from '@/ui/components';
import classNames from 'classnames';
import styles from './SpendingDonut.module.scss';
import { getSpendingOverview } from '@/lib/api/budget/fetch';

export default interface SpendingDonut {
	slug: string[];
	loading?: boolean;
}

export const SpendingDonut: React.FC<SpendingDonut> = async ({
	slug,
	loading = false,
}) => {
	let budgetInformation = {
		chartData: {
			labels: [''],
			datasets: [{ label: '', data: [0], backgroundColor: [] }],
		},
		totalAmount: 0,
		income: 0,
		surplus: 0,
	};

	if (!loading) {
		budgetInformation = await getSpendingOverview(slug);
	}

	return (
		<>
			<DonutChart
				chartData={budgetInformation.chartData}
				showLabels={false}
				totalAmount={budgetInformation.totalAmount}
				singleValue
				loading={loading}
				className={classNames(styles.spending_donut)}
			/>
			<div className={classNames(styles.spending_donut_labels)}>
				<LabeledAmount
					label="Inkomst"
					amount={budgetInformation.income}
					loading={loading}
				/>
				<LabeledAmount
					label={'Överskott'}
					amount={budgetInformation.surplus}
					loading={loading}
				/>
			</div>
		</>
	);
};
