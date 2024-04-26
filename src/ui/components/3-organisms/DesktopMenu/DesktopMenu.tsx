import classNames from 'classnames';
import styles from './DesktopMenu.module.scss';
import { LinkComponent } from '@/ui/components';

export interface DesktopMenuProps {
	navigation: {
		url: string;
		label: string;
		isActive: boolean;
	}[];
	className?: string;
}

export const DesktopMenu = ({ navigation, className }: DesktopMenuProps) => {
	return (
		<nav className={classNames(styles.desktop_navigation, className)}>
			{navigation.map((item: any, index: any) => (
				<LinkComponent
					key={index}
					url={item.url}
					style="dark"
					className={classNames(
						item.isActive && styles.desktop_navigation_link__active
					)}
				>
					{item.label}
				</LinkComponent>
			))}
		</nav>
	);
};
