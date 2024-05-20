import '@/ui/styles/globals.scss';
import styles from './layout.module.scss';
import classNames from 'classnames';
import { Header, Main, ToastProvider } from '@/ui/components';
import { BudgetIdProvider } from '@/context/budgetIdContext';
import { Comfortaa, Montserrat } from 'next/font/google';

const comfortaa = Comfortaa({
	weight: ['300', '400', '500', '600', '700'],
	subsets: ['latin'],
	variable: '--font-comfortaa',
	display: 'swap',
});

const montserrat = Montserrat({
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
	variable: '--font-montserrat',
	display: 'swap',
});

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

export default function RootLayout({
	modal,
	children,
}: Readonly<{
	modal: React.ReactNode;
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${comfortaa.variable} ${montserrat.variable}`}>
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
