import classNames from 'classnames';
import styles from './FormfieldSelect.module.scss';
import { ErrorMessage, Label } from '@/ui/components/1-atoms/Form';

type Option = {
	value: string;
	text?: string;
	caption?: string;
	disabled?: boolean;
	hidden?: boolean;
	selected?: boolean;
};

type State = {
	required?: boolean;
	disabled?: boolean;
	hasError?: boolean;
	hiddenLabel?: boolean;
	errorMessage?: string;
};

export interface FormfieldSelectProps {
	className?: string;
	id: string;
	multiple?: boolean;
	name?: string;
	label: string;
	labelStyle?: 'default' | 'md';
	options: Option[];
	size?: number;
	background?: boolean;
	register?: any;
	requiredErrorMessage?: string;
	state?: State;
	defaultValue?: string;
	placeHolderValue?: string;
	value?: string;
	preOption?: string;
	tabIndex?: number;
	onChange?: (e: any) => void;
}

const ariaLabel = (state: State, label: string) => {
	if (state?.['hiddenLabel']) return label;
};

const ariaError = (state: State, name: string, id: string) => {
	if (state?.['hasError']) return name + id;
};

export const FormfieldSelect: React.FC<FormfieldSelectProps> = ({
	className,
	register,
	requiredErrorMessage,
	state,
	id,
	label,
	labelStyle = 'default',
	options,
	name,
	multiple,
	background,
	size,
	tabIndex = 0,
	value,
	defaultValue,
	placeHolderValue,
	onChange,
}) => {
	const { required, disabled, hasError, hiddenLabel, errorMessage } =
		state ?? {};
	return (
		<div
			className={classNames(
				styles.formfield_select,
				className,
				{ [styles.hasError]: hasError },
				{ [styles.isDisabled]: disabled },
				{ [styles.formfield_select__background]: background }
			)}
		>
			{!hiddenLabel && (
				<Label
					id={id}
					className={classNames(
						styles.formfield_select_label,
						styles[`formfield_select_label__${labelStyle}`],
						hiddenLabel && styles.formfield_textarea_label__hidden
					)}
					state={state}
				>
					{label}
				</Label>
			)}
			<div
				className={classNames(styles.formfield_select_wrapper, {
					[styles.isMultiple]: multiple === true,
				})}
			>
				<select
					name={name}
					id={id}
					className={classNames(styles.formfield_select_element, {
						[styles.formfield_select_element__noLabel]: !label,
					})}
					aria-label={ariaLabel(state!, label)}
					aria-describedby={ariaError(state!, name!, id)}
					multiple={multiple}
					size={size}
					disabled={disabled}
					defaultValue={defaultValue && ''}
					value={value}
					onChange={onChange}
					tabIndex={tabIndex}
					{...(register && {
						...register(name, {
							required: required ? requiredErrorMessage : false,
						}),
					})}
				>
					{placeHolderValue && (
						<option value={placeHolderValue} disabled={true} hidden={false}>
							{placeHolderValue}
						</option>
					)}
					{options.map((option, index) => (
						<option
							value={option.value}
							disabled={option.disabled}
							hidden={option.hidden}
							key={index}
						>
							{option?.text || option?.caption}
						</option>
					))}
				</select>
			</div>

			{hasError && <ErrorMessage id={name + id}>{errorMessage}</ErrorMessage>}
		</div>
	);
};
