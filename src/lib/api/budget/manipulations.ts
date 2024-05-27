import { extractYear } from '@/helpers/date';
import { getClient } from '@/lib/apolloClient';
import { CREATE_BUDGET } from './graphql';

export type Budget = {
	title: string;
	description: string;
	startDate: string;
	endDate: string;
};

export const createBudget = async (budgetData: Budget) => {
	const client = getClient();
	try {
		const { data } = await client.mutate({
			variables: {
				data: {
					title: budgetData.title,
					description: budgetData.description,
					startDate: budgetData.startDate,
					endDate: budgetData.endDate,
				},
			},
			mutation: CREATE_BUDGET,
		});

		const slug = `${data.budgetCreate.title.toLowerCase()}/${extractYear(data.budgetCreate.endDate)}`;

		return { success: true, newRoute: `/finances/${slug}` };
	} catch (error) {
		console.error('An error occured', error);
		return { success: false };
	}
};
