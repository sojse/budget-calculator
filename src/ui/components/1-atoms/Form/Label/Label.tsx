import classNames from 'classnames';
import styles from './Label.module.scss';

export interface LabelProps {
	className?: string;
	id: string;
	state?: {
		required?: boolean;
		disabled?: boolean;
		hasError?: boolean;
		isHidden?: boolean;
	};
	children?: React.ReactNode;
};

export const Label: React.FC<LabelProps> = ({
	className,
	id,
	children,
	state,
}) => (
	<label
		className={classNames(
			styles.label,
			{ [styles.hasError]: state?.hasError },
			{ [styles.isDisabled]: state?.disabled },
			{ [styles.isHidden]: state?.isHidden },
			{ [styles.isRequired]: state?.required },
			className
		)}
		htmlFor={id}
	>
		<span>{children}</span>
		{state?.required && <span aria-hidden="true">*</span>}
	</label>
);
