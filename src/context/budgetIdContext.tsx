'use client';
import React, { createContext, useState } from 'react';

type IncomeType = { name: string; amount: string; id: string };

interface BudgetContextType {
	currentBudgetId: string;
	incomes: IncomeType[];
	setCurrentBudgetId: (id: string) => void;
	setIncomes: (incomes: { name: string; amount: string; id: string }[]) => void;
}

export const BudgetIdContext = createContext<BudgetContextType>({
	currentBudgetId: '',
	incomes: [],
	setCurrentBudgetId: () => {},
	setIncomes: () => {},
});

export const BudgetIdProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [currentBudgetId, setCurrentBudgetId] = useState('');
	const [incomes, setIncomes] = useState<IncomeType[]>([]);

	const contextValue = {
		currentBudgetId,
		incomes,
		setCurrentBudgetId,
		setIncomes,
	};

	return (
		<BudgetIdContext.Provider value={contextValue}>
			{children}
		</BudgetIdContext.Provider>
	);
};
