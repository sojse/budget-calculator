import { useContext } from 'react';
import { BudgetIdContext } from '@/context/budgetIdContext';

export const useBudgetId = () => {
	return useContext(BudgetIdContext);
};
