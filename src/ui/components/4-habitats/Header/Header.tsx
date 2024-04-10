import classNames from 'classnames';
import styles from './Header.module.scss';
import Logo from '@/ui/icons/icon-logo.svg';
import User from '@/ui/icons/icon-user.svg';
import {
	HamburgerButton,
	Heading,
	LinkComponent,
	MobileMenu,
} from '@/ui/components';
import { MobileMenuProvider } from '@/context/mobileMenuContext';
import Link from 'next/link';

export interface HeaderProps {
	navigation: {
		url: string;
		label: string;
		isActive: boolean;
	}[];
}

export const Header = ({ navigation }: HeaderProps) => {
	return (
		<MobileMenuProvider>
			<header className={classNames(styles.header)}>
				<Link href="/" className={classNames(styles.header_logo_container)}>
					<Logo className={classNames(styles.header_logo)} />
					<Heading
						headingLevel={'h2'}
						color="dark"
						style="xs"
						className={classNames(styles.header_logo_text)}
					>
						Budget kalkylator
					</Heading>
				</Link>
				<nav className={classNames(styles.header_navigation_desktop)}>
					{navigation.map((item: any, index: any) => (
						<LinkComponent
							key={index}
							url={item.url}
							style="dark"
							className={
								item.isActive &&
								classNames(styles.header_navigation_link__active)
							}
						>
							{item.label}
						</LinkComponent>
					))}
				</nav>
				<div className={classNames(styles.header_icon_container)}>
					<User className={classNames(styles.header_icon)} />
					<HamburgerButton
						className={classNames(styles.header_hamburger_menu)}
					/>
				</div>
			</header>
			<MobileMenu navigation={navigation} />
		</MobileMenuProvider>
	);
};
