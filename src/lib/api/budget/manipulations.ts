import gql from 'graphql-tag';
import { extractYear } from '@/helpers/date';
import { revalidateTag } from 'next/cache';
import { getClient } from '@/lib/apolloClient';

const CREATE_BUDGET = gql`
	mutation BudgetCreate($data: BudgetCreateDataInput!) {
		budgetCreate(data: $data) {
			description
			endDate
			startDate
			title
		}
	}
`;

export const createBudget = async (budgetData: any) => {
	const client = getClient();
	try {
		const { data } = await client.mutate({
			variables: {
				data: {
					title: budgetData.budgetTitle,
					description: budgetData.description,
					startDate: budgetData.startDate,
					endDate: budgetData.endDate,
				},
			},
			mutation: CREATE_BUDGET,
		});

		const slug = `${data.budgetCreate.title.toLowerCase()}/${extractYear(data.budgetCreate.endDate)}`;

		revalidateTag('budgets');

		return { success: true, newRoute: `/finances/${slug}` };
	} catch (error) {
		console.error('An error occured', error);
		return { success: false };
	}
};