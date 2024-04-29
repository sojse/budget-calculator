'use client';
import React, { createContext, useState } from 'react';

export type Income = {
	title: string;
	amount: number;
	monthlyTransaction: boolean;
	id: string;
};

export type Expense = {
	title: string;
	amount: number;
	categoryType: string;
	monthlyTransaction: boolean;
	id: string;
};

interface BudgetContextType {
	currentBudgetId: string;
	income: Income;
	setCurrentBudgetId: (id: string) => void;
	setIncome: (income: Income) => void;
}

export const BudgetIdContext = createContext<BudgetContextType>({
	currentBudgetId: '',
	income: { title: '', amount: 0, monthlyTransaction: true, id: '' },
	setCurrentBudgetId: () => {},
	setIncome: () => {},
});

export const BudgetIdProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [currentBudgetId, setCurrentBudgetId] = useState('');
	const [income, setIncome] = useState<Income>({
		title: '',
		amount: 0,
		monthlyTransaction: true,
		id: '',
	});

	const contextValue = {
		currentBudgetId,
		income,
		setCurrentBudgetId,
		setIncome,
	};

	return (
		<BudgetIdContext.Provider value={contextValue}>
			{children}
		</BudgetIdContext.Provider>
	);
};
