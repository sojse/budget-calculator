import classNames from 'classnames';
import styles from './LabeledAmount.module.scss';
import { formatCost } from '@/helpers/number';

export default interface LabeledAmount {
	amount: number;
	label: string;
	className?: string;
	loading: boolean;
}

export const LabeledAmount: React.FC<LabeledAmount> = async ({
	className,
	label,
	amount,
	loading,
}) => {
	return (
		<div className={classNames(styles.labeled_amount, className)}>
			<span
				className={classNames(
					styles.labeled_amount_amount,
					loading && 'u-skeleton-text u-skeleton-text--medium'
				)}
			>
				{formatCost(amount)} kr
			</span>
			<span className={classNames(loading && 'u-skeleton')}>{label}</span>
		</div>
	);
};
