'use client';
import classNames from 'classnames';
import styles from './HamburgerButton.module.scss';
import Hamburger from '@/ui/icons/icon-hamburger.svg';
import Close from '@/ui/icons/icon-close.svg';
import { useMobileMenu } from '@/hooks/useMobileMenu';

export interface HamburgerButtonProps {
	className?: string;
}

export const HamburgerButton = ({ className }: HamburgerButtonProps) => {
	const { mobileMenuOpen, toggleMenu } = useMobileMenu();

	const toggleMobileMenu = () => {
		toggleMenu(!mobileMenuOpen);
	};

	return (
		<button
			className={classNames(styles.hamburger_button, className)}
			aria-expanded={mobileMenuOpen}
			aria-label={!mobileMenuOpen ? 'Open mobile menu' : 'Close mobile menu'}
			onClick={toggleMobileMenu}
		>
			{!mobileMenuOpen ? (
				<Hamburger className={classNames(styles.hamburger_button_icon)} />
			) : (
				<Close className={classNames(styles.hamburger_button_icon)} />
			)}
		</button>
	);
};
