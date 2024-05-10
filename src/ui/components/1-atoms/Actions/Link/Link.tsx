'use client';
import classNames from 'classnames';
import styles from './Link.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
	scroll?: boolean;
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
	scroll = false,
}) => {
	const router = useRouter();
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

	const navigate = () => {
		router.push(url, { scroll: scroll });
	};

	return (
		<>
			{asText ? (
				<span
					className={classNames(
						styles.link,
						styles[`link__${style}`],
						className
					)}
				>
					{children}
				</span>
			) : asButton ? (
				<button
					style={overrideStyle}
					aria-label={ariaLabel}
					onClick={navigate}
					className={buttonClasses}
				>
					{children}
				</button>
			) : (
				<Link
					href={url}
					style={overrideStyle}
					target={target}
					aria-label={ariaLabel}
					className={linkClasses}
					scroll={scroll}
				>
					{children}
				</Link>
			)}
		</>
	);
};
