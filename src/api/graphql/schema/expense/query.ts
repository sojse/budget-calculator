import prisma from '@/api/prisma/db';
import { CategoryType } from '@prisma/client';

export const ExpenseQuery = {
	expenseCategoryTypes: () => {
		return Object.values(CategoryType);
	},
};
