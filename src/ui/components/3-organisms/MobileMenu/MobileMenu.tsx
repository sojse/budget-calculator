'use client';
import classNames from 'classnames';
import styles from './MobileMenu.module.scss';
import { LinkComponent } from '@/ui/components';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export interface MobileMenuProps {
	navigation: {
		url: string;
		label: string;
		isActive: boolean;
	}[];
	className?: string;
	mobileMenuOpen: boolean;
	toggleMobileMenu: (state: boolean) => void;
}

export const MobileMenu = ({
	navigation,
	className,
	mobileMenuOpen,
	toggleMobileMenu,
}: MobileMenuProps) => {
	const pathName = usePathname();

	useEffect(() => {
		toggleMobileMenu(false);
	}, [pathName]);

	return (
		<nav
			className={classNames(
				styles.mobile_menu,
				mobileMenuOpen && styles.mobile_menu__open,
				className
			)}
		>
			<ul className={classNames(styles.mobile_menu_list)}>
				{navigation.map((item: any, index: any) => (
					<li key={index}>
						<LinkComponent
							url={item.url}
							style="dark"
							className={
								item.isActive && classNames(styles.mobile_menu_link__active)
							}
						>
							{item.label}
						</LinkComponent>
					</li>
				))}
			</ul>
		</nav>
	);
};
