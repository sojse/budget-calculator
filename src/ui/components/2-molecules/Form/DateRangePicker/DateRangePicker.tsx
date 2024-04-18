'use client';
import { useEffect, useRef, useState } from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import styles from './DateRangePicker.module.scss';
import classNames from 'classnames';
import 'react-day-picker/dist/style.css';
import { sv } from 'date-fns/locale';
import { ErrorMessage, Label } from '@/ui/components';

type State = {
	required?: boolean;
	disabled?: boolean;
	hasError?: boolean;
	hiddenLabel?: boolean;
	errorMessage?: string;
};

export interface DateRangePickerProps {
	className?: string;
	defaultValue?: string;
	id: string;
	name?: string;
	label: string;
	state?: State;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
	className,
	state,
	id,
	label,
	defaultValue,
	name,
}) => {
	const { required, disabled, hasError, hiddenLabel, errorMessage } =
		state ?? {};
	const [range, setRange] = useState<DateRange | undefined>(undefined);
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const clickOutsideRef = useRef<HTMLDivElement | null>(null);
	const handleOutsideClick = (e: any) => {
		if (
			clickOutsideRef.current &&
			!clickOutsideRef.current.contains(e.target)
		) {
			setIsCalendarOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleOutsideClick);
		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, []);

	return (
		<div
			className={classNames(
				styles.day_picker,
				className,
				{ [styles.hasError]: hasError },
				{ [styles.isDisabled]: disabled }
			)}
		>
			{!hiddenLabel && (
				<Label
					id={id}
					className={classNames(
						styles.date_pciker_label,
						hiddenLabel && styles.day_picker_label__hidden
					)}
					state={state}
				>
					{label}
				</Label>
			)}
			<div
				ref={clickOutsideRef}
				className={classNames(styles.day_picker_input_container)}
			>
				<input
					onClick={(e) => {
						e.preventDefault;
						setIsCalendarOpen(!isCalendarOpen);
					}}
					name={name}
					id={id}
					disabled={disabled}
					className={classNames(styles.day_picker_input, {
						[styles.hasError]: hasError,
					})}
					type="text"
					required
					placeholder={defaultValue}
					value={
						range == undefined
							? undefined
							: `${range.from?.toLocaleDateString()} - ${range.to !== undefined ? range.to.toLocaleDateString() : 'åååå-mm-dd'}`
					}
				/>

				<div
					className={classNames(
						styles.day_picker_calendar,
						isCalendarOpen && styles.day_picker_calendar__open
					)}
					aria-hidden={!isCalendarOpen}
				>
					<DayPicker
						mode="range"
						id="datePicker"
						defaultMonth={new Date()}
						selected={range}
						onSelect={setRange}
						locale={sv}
						className={classNames(styles.day_picker_picker)}
					/>
				</div>
				{hasError && <ErrorMessage id={id}>{errorMessage}</ErrorMessage>}
			</div>
		</div>
	);
};
