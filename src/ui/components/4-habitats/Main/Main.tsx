import styles from './Main.module.scss';

export interface MainProps {
	children: React.ReactNode;
}

export const Main: React.FC<MainProps> = ({ children }) => (
	<main id="main" className={styles.main}>
		{children}
	</main>
);
