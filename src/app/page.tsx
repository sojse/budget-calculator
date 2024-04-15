import { Main, SiteHeading } from '@/ui/components';

const budgetInformation = {
	years: [
		{ value: '2024', caption: '2024' },
		{ value: '2023', caption: '2023' },
		{ value: '2022', caption: '2022' },
		{ value: '2021', caption: '2021' },
	],
	months: [
		{ value: 'Januari', caption: 'Januari' },
		{ value: 'Februari', caption: 'Februari' },
		{ value: 'Mars', caption: 'Mars' },
		{ value: 'April', caption: 'April' },
	],
};

export default function Home() {
	return (
		<Main>
			<SiteHeading budgetInformation={budgetInformation}>
				{'Mars budget'}
			</SiteHeading>
		</Main>
	);
}
