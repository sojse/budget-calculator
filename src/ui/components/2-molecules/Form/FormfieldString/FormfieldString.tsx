'use client';

import classNames from 'classnames';
import styles from './FormfieldString.module.scss';
import { ErrorMessage, Label } from '@/ui/components/1-atoms/Form';
import { useRef } from 'react';
type State = {
	required?: boolean;
	disabled?: boolean;
	hasError?: boolean;
	hiddenLabel?: boolean;
	errorMessage?: string;
};

export interface FormfieldStringProps {
	className?: string;
	onChange?: (e: any) => void;
	defaultValue?: string;
	id: string;
	label: string;
	name?: string;
	background?: boolean;
	placeholder?: string;
	register?: any;
	invalidErrorMessage?: string;
	requiredErrorMessage?: string;
	state?: State;
	password?: boolean;
	value?: string;
	autoFocus?: boolean;
	type:
		| 'text'
		| 'email'
		| 'search'
		| 'number'
		| 'password'
		| 'tel'
		| 'url'
		| 'date';
	min?: number;
	max?: number;
	pattern?: string;
}

const ariaLabel = (state: State, label: string) => {
	if (state?.['hiddenLabel']) return label;
};

const ariaError = (state: State, type: string, id: string) => {
	if (state?.['hasError']) return type + id;
};

export const FormfieldString: React.FC<FormfieldStringProps> = ({
	className,
	state,
	id,
	label,
	type,
	register,
	placeholder,
	onChange,
	background,
	name,
	defaultValue,
	min,
	max,
	value,
	pattern,
	invalidErrorMessage = ' ',
	requiredErrorMessage = ' ',
	autoFocus = false,
}) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const { required, disabled, hasError, hiddenLabel, errorMessage } =
		state ?? {};

	return (
		<div
			className={classNames(
				styles.formfield_string,
				className,
				{ [styles.hasError]: hasError },
				{ [styles.isDisabled]: disabled },
				{ [styles.formfield_string__background]: background }
			)}
		>
			{!hiddenLabel && (
				<Label
					id={id}
					className={classNames(
						styles.formfield_string_label,
						hiddenLabel && styles.formfield_textarea_label__hidden
					)}
					state={state}
				>
					{label}
				</Label>
			)}
			<input
				value={value}
				onChange={onChange}
				className={classNames(
					styles.formfield_string_input,
					styles.input__string,
					{
						[styles.hasError]: hasError,
					}
				)}
				name={name}
				id={id}
				disabled={disabled}
				required={required}
				defaultValue={defaultValue}
				aria-label={ariaLabel(state!, label!)}
				aria-describedby={ariaError(state!, type, id)}
				placeholder={placeholder}
				min={min}
				max={max}
				pattern={pattern}
				type={type}
				autoFocus={autoFocus}
				ref={inputRef}
				{...(register && {
					...register(name, {
						required: required ? requiredErrorMessage : false,
						pattern: pattern
							? {
									value: new RegExp(pattern),
									message: invalidErrorMessage,
								}
							: null,
					}),
				})}
			/>
			{hasError && <ErrorMessage id={type + id}>{errorMessage}</ErrorMessage>}
		</div>
	);
};
