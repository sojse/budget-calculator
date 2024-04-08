import classNames from 'classnames';
import styles from './Button.module.scss';
// import { Spinner } from '../../Media';

export type ButtonProps = {
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
};

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
	loading = false,
	onClick,
}) => (
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
			className={classNames({
				[styles.button_content__hidden]: loading,
			})}
		>
			{children}
		</span>
	</button>
);
