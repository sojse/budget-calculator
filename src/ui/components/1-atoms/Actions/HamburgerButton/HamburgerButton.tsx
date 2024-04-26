'use client';
import classNames from 'classnames';
import styles from './HamburgerButton.module.scss';
import Hamburger from '@/ui/icons/icon-hamburger.svg';
import Close from '@/ui/icons/icon-close.svg';

export interface HamburgerButtonProps {
	className?: string;
	mobileMenuOpen: boolean;
	toggleMobileMenu: (state: boolean) => void;
}

export const HamburgerButton = ({
	className,
	mobileMenuOpen,
	toggleMobileMenu,
}: HamburgerButtonProps) => {
	return (
		<button
			className={classNames(styles.hamburger_button, className)}
			aria-expanded={mobileMenuOpen}
			aria-label={!mobileMenuOpen ? 'Open mobile menu' : 'Close mobile menu'}
			onClick={() => toggleMobileMenu(!mobileMenuOpen)}
		>
			{!mobileMenuOpen ? (
				<Hamburger className={classNames(styles.hamburger_button_icon)} />
			) : (
				<Close className={classNames(styles.hamburger_button_icon)} />
			)}
		</button>
	);
};
