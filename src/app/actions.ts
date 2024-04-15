'use server';
import { fetchMonthData } from '@/lib/api';
import client from '@/lib/apolloClient';
import gql from 'graphql-tag';

const responseBody = {
	query: gql`
		query BudgetsQuery {
			budgets {
				year
				budgets {
					title
					id
				}
			}
		}
	`,
};

export async function getMonthData(year: string) {
	return await fetchMonthData(year);
}
