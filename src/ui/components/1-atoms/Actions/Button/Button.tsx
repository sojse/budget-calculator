import classNames from 'classnames';
import styles from './Button.module.scss';
import Spinner from '@/ui/icons/icon-spinner.svg';

export interface ButtonProps {
	children: React.ReactNode;
	style?: 'primary' | 'secondary' | 'underline';
	buttonName?: string;
	title?: string;
	className?: string;
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	align?: 'default' | 'center' | 'right';
	width?: 'default' | 'maxMobile';
	loading?: boolean;
	spinnerColor?: 'dark' | 'light';
	onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
	children,
	buttonName,
	style,
	title,
	className,
	type,
	disabled,
	align,
	width,
	loading,
	onClick,
}) => (
	<div
		className={classNames(
			styles.button_container,
			loading && styles.button__loading
		)}
	>
		<button
			name={buttonName}
			type={type || 'button'}
			title={title}
			className={classNames(
				styles.button,
				styles[`button__${style}`],
				styles[`button__${align}`],
				styles[`button__${width}`],
				className
			)}
			disabled={disabled || loading}
			aria-disabled={disabled || loading}
			onClick={onClick}
		>
			<span
				className={classNames(styles.button_content, {
					[styles.button_content__hidden]: loading,
				})}
			>
				{children}
			</span>
		</button>
		{loading && <Spinner className={classNames(styles.button_spinner)} />}
	</div>
);
