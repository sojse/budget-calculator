import '@/ui/styles/globals.scss';
import styles from './layout.module.scss';
import classNames from 'classnames';
import { Header, Main, ToastProvider } from '@/ui/components';
import { BudgetIdProvider } from '@/context/budgetIdContext';

export const metadata = {
	title: 'Budget Calculator',
	description: 'A tool to track your monthly budgets',
	icons: {
		icon: './icon.png',
	},
};

const navigation = [
	{ url: '/overview', label: 'Översikt', isActive: false },
	{ url: '/finances', label: 'Ekonomi', isActive: false },
	{ url: '/details', label: 'Utgiftsdetaljer', isActive: false },
];

export const revalidate = 10;

export default function RootLayout({
	modal,
	children,
}: Readonly<{
	modal: React.ReactNode;
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={classNames(styles.layout)}>
				<ToastProvider>
					<BudgetIdProvider>
						<Header navigation={navigation} />
						<Main>{children}</Main>
						<div className={classNames(styles.layout_modal)}>{modal}</div>
					</BudgetIdProvider>
				</ToastProvider>
			</body>
		</html>
	);
}
