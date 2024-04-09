import classNames from 'classnames';
import styles from './FormfieldRadio.module.scss';
import { Label } from '@/ui/components/1-atoms/Form/Label';

export interface FormfieldRadioProps {
	className?: string;
	defaultChecked?: boolean;
	value?: string;
	id: string;
	label: string;
	name: string;
	fieldGroup?: boolean;
	register?: any;
	state?: {
		hasError?: boolean;
		disabled?: boolean;
		required?: boolean;
		hiddenLabel?: boolean;
	};
	onChange?: (value: string) => void;
}

export const FormfieldRadio: React.FC<FormfieldRadioProps> = ({
	className,
	value,
	defaultChecked,
	state,
	id,
	label,
	name,
	register,
	fieldGroup,
	onChange,
}) => {
	const { required, disabled, hasError, hiddenLabel } = state ?? {};
	const labelState = {
		disabled: state?.disabled,
		required: state?.required && !fieldGroup,
		hasError: state?.hasError,
	};

	const handleChange = (fieldValue: string) => {
		onChange && onChange(fieldValue);
	};

	return (
		<div
			className={classNames(
				styles.formfield_radio,
				className,
				{ [styles.hasError]: hasError },
				{ [styles.isDisabled]: disabled }
			)}
		>
			<input
				type="radio"
				className={classNames(
					styles.formfield_radio_input,
					styles.input__choice
				)}
				name={name}
				id={id}
				defaultChecked={defaultChecked}
				disabled={disabled}
				value={value}
				required={required}
				{...(register && { ...register(name, { required }) })}
				onChange={() => handleChange(value!)}
			/>
			<Label
				id={id}
				className={classNames(
					styles.formfield_radio_label,
					hiddenLabel && styles.formfield_radio_label__hidden
				)}
				state={labelState}
			>
				{label}
			</Label>
		</div>
	);
};
