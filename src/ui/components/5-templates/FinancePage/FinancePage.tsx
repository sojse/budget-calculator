import {
	Header,
	Main,
	SiteHeading,
	SiteHeadingProps,
	HeaderProps,
} from '@/ui/components';

export interface FinancePageProps {
	budgetInformation: SiteHeadingProps;
	header: HeaderProps;
}

export default function FinancePage({
	budgetInformation,
	header,
}: FinancePageProps) {
	return (
		<>
			<Header navigation={header.navigation} />
			<Main>hej</Main>
		</>
	);
}
