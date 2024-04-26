'use client';
import classNames from 'classnames';
import styles from './Header.module.scss';
import Logo from '@/ui/icons/icon-logo.svg';
import User from '@/ui/icons/icon-user.svg';
import {
	DesktopMenu,
	HamburgerButton,
	Heading,
	MobileMenu,
} from '@/ui/components';
import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';
import { useState } from 'react';

export interface HeaderProps {
	navigation: {
		url: string;
		label: string;
		isActive: boolean;
	}[];
}

export const Header = ({ navigation }: HeaderProps) => {
	const segment = useSelectedLayoutSegments();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const toggleMenu = (state: boolean) => {
		setMobileMenuOpen(state);
	};

	const dynamicNavigation = navigation.map((item) => {
		let isActive = false;

		var url: string;

		if (segment.length >= 1) {
			url = '/' + segment[0];
		} else {
			url = '/' + segment.join('/');
		}

		if (url === item.url) {
			isActive = true;
		}

		const updatedUrl =
			segment.length > 1 ? `${item.url}/${segment[1]}` : item.url;

		return {
			label: item.label,
			isActive: isActive,
			url: updatedUrl,
		};
	});

	return (
		<>
			<header className={classNames(styles.header)}>
				<Link
					href={navigation[0].url}
					className={classNames(styles.header_logo_container)}
				>
					<Logo className={classNames(styles.header_logo)} />
					<Heading
						headingLevel={'h2'}
						color="dark"
						style="xs"
						className={classNames(styles.header_logo_text)}
					>
						Budgetkalkylator
					</Heading>
				</Link>
				<DesktopMenu
					navigation={dynamicNavigation}
					className={classNames(styles.header_navigation_desktop)}
				/>
				<div className={classNames(styles.header_icon_container)}>
					<User className={classNames(styles.header_icon)} />
					<HamburgerButton
						className={classNames(styles.header_hamburger_menu)}
						mobileMenuOpen={mobileMenuOpen}
						toggleMobileMenu={toggleMenu}
					/>
				</div>
			</header>
			<MobileMenu
				navigation={dynamicNavigation}
				mobileMenuOpen={mobileMenuOpen}
				toggleMobileMenu={toggleMenu}
			/>
		</>
	);
};
