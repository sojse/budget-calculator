'use client';
import React, { createContext, useState } from 'react';

export type Income = {
	title: string;
	amount: number;
	categoryType: CategoryType;
	monthlyTransaction: boolean;
	id: string;
};

export type Expense = {
	title: string;
	amount: number;
	categoryType: CategoryType;
	monthlyTransaction: boolean;
	id: string;
};

export type CategoryType = {
	category:
		| 'income'
		| 'home'
		| 'transport'
		| 'savings'
		| 'shopping'
		| 'other'
		| 'entertainment';
};

interface BudgetContextType {
	currentBudgetId: string;
	income: Income;
	setCurrentBudgetId: (id: string) => void;
	setIncome: (income: Income) => void;
}

export const BudgetIdContext = createContext<BudgetContextType>({
	currentBudgetId: '',
	income: {
		title: '',
		amount: 0,
		monthlyTransaction: true,
		id: '',
		categoryType: { category: 'income' },
	},
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
		categoryType: { category: 'income' },
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
