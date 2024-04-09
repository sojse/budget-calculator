import classNames from 'classnames';
import styles from './FormfieldTextarea.module.scss';
import { ErrorMessage, Label } from '@/ui/components/1-atoms/Form';

type State = {
	required?: boolean;
	disabled?: boolean;
	hasError?: boolean;
	hiddenLabel?: boolean;
	errorMessage?: string;
};

export interface FormfieldTextareaProps {
	className?: string;
	defaultValue?: string;
	id: string;
	name?: string;
	placeholder?: string;
	register?: any;
	requiredErrorMessage?: string;
	background?: boolean;
	rows?: number;
	label: string;
	state?: State;
}

const ariaLabel = (state: State, label: string) => {
	if (state?.['hiddenLabel']) return label;
};

const ariaError = (state: State, name: string, id: string) => {
	if (state?.['hasError']) return name + id;
};

export const FormfieldTextarea: React.FC<FormfieldTextareaProps> = ({
	className,
	state,
	id,
	label,
	placeholder,
	register,
	requiredErrorMessage,
	background,
	defaultValue,
	rows,
	name,
}) => {
	const { required, disabled, hasError, hiddenLabel, errorMessage } =
		state ?? {};

	return (
		<div
			className={classNames(
				styles.formfield_textarea,
				className,
				{ [styles.hasError]: hasError },
				{ [styles.isDisabled]: disabled },
				{ [styles.formfield_textarea__background]: background }
			)}
		>
			<Label
				id={id}
				className={classNames(
					styles.formfield_textarea_label,
					hiddenLabel && styles.formfield_textarea_label__hidden
				)}
				state={state}
			>
				{label}
			</Label>
			<textarea
				className={classNames(styles.formfield_textarea_input, {
					[styles.hasError]: hasError,
				})}
				name={name}
				id={id}
				aria-label={ariaLabel(state!, label)}
				aria-describedby={ariaError(state!, name!, id)}
				disabled={disabled}
				placeholder={placeholder}
				defaultValue={defaultValue}
				rows={rows || 5}
				{...(register && {
					...register(name, {
						required: required ? requiredErrorMessage : false,
					}),
				})}
			/>
			{hasError && <ErrorMessage id={name + id}>{errorMessage}</ErrorMessage>}
		</div>
	);
};
