import classNames from 'classnames';
import styles from './Link.module.scss';
import Link from 'next/link';

export interface LinkProps {
	children: React.ReactNode;
	style?: 'primary' | 'dark' | 'disabled';
	overrideStyle?: any;
	width?: 'default' | 'maxMobile';
	ariaLabel?: string;
	className?: string;
	url: string;
	asText?: boolean;
	asButton?: boolean;
	target?: string;
	onClick?: () => void;
}

export const LinkComponent: React.FC<LinkProps> = ({
	children,
	style,
	overrideStyle,
	ariaLabel,
	className,
	url,
	target,
	asText,
	asButton,
	width,
	onClick,
}) => {
	const linkClasses = classNames(
		styles.link,
		styles[`link__${style}`],
		styles[`link__${width}`],
		className
	);

	const buttonClasses = classNames(
		styles.button,
		styles[`button__${style}`],
		className
	);

	return (
		<>
			{asText ? (
				<p
					className={classNames(
						styles.link,
						styles[`link__${style}`],
						className
					)}
				>
					{children}
				</p>
			) : (
				<Link
					href={url}
					style={overrideStyle}
					target={target}
					aria-label={ariaLabel}
					onClick={onClick}
					className={!asButton ? linkClasses : buttonClasses}
				>
					{children}
				</Link>
			)}
		</>
	);
};
