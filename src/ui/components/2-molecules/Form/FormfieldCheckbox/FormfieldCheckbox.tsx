import classNames from 'classnames';
import styles from './FormfieldCheckbox.module.scss';
import React from 'react';
import { Label } from '@/ui/components/1-atoms/Form/Label';

export interface FormfieldCheckboxProps {
	className?: string;
	defaultChecked?: boolean;
	defaultValue?: string;
	value?: string;
	id: string;
	label: string;
	multiline?: boolean;
	name?: string;
	fieldGroup?: boolean;
	register?: any;
	onChange: () => void;
	state?: {
		required?: boolean;
		disabled?: boolean;
		hasError?: boolean;
		hiddenLabel?: boolean;
	};
}

export const FormfieldCheckbox: React.FC<FormfieldCheckboxProps> = ({
	className,
	fieldGroup,
	register,
	state,
	id,
	label,
	multiline,
	name,
	defaultChecked,
	defaultValue,
	value,
	onChange,
}) => {
	const { required, disabled, hasError, hiddenLabel } = state ?? {};
	const labelState = {
		isHidden: false,
		disabled: state?.disabled,
		required: state?.required && !fieldGroup,
		hasError: state?.hasError,
	};
	return (
		<div
			className={classNames(
				styles.formfield_checkbox,
				className,
				{ [styles.hasError]: hasError },
				{ [styles.isDisabled]: disabled },
				{ [styles.formfield_checkbox__multiline]: multiline === true }
			)}
		>
			<input
				type="checkbox"
				className={classNames(
					styles.formfield_checkbox_input,
					styles.input__choice,
					{
						[styles.hasError]: hasError,
					}
				)}
				name={name}
				id={id}
				defaultChecked={defaultChecked}
				disabled={disabled}
				defaultValue={defaultValue}
				value={value}
				onChange={onChange}
				{...(register && { ...register(name, { required }) })}
			/>
			<Label
				id={id}
				className={classNames(
					styles.formfield_checkbox_label,
					hiddenLabel && styles.formfield_checkbox_label__hidden
				)}
				state={labelState}
			>
				{label}{' '}
			</Label>
		</div>
	);
};
