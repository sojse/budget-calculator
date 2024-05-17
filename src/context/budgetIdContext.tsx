'use client';
import React, { createContext, useState } from 'react';

export type CategoryType = {
	category:
		| 'income'
		| 'home'
		| 'transportation'
		| 'savings'
		| 'shopping'
		| 'other'
		| 'entertainment';
};

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

interface BudgetContextType {
	currentBudgetId: string;
	data: Income | Expense;
	currentPathName: string;
	setCurrentPathName: (slug: string) => void;
	setCurrentBudgetId: (id: string) => void;
	setData: (income: Income) => void;
}

export const BudgetIdContext = createContext<BudgetContextType>({
	currentBudgetId: '',
	data: {
		title: '',
		amount: 0,
		monthlyTransaction: true,
		id: '',
		categoryType: { category: 'income' },
	},
	currentPathName: '',
	setCurrentPathName: () => {},
	setCurrentBudgetId: () => {},
	setData: () => {},
});

export const BudgetIdProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [currentBudgetId, setCurrentBudgetId] = useState('');
	const [data, setData] = useState<Income | Expense>({
		title: '',
		amount: 0,
		monthlyTransaction: true,
		id: '',
		categoryType: { category: 'income' },
	});
	const [currentPathName, setCurrentPathName] = useState<string>('');

	const contextValue = {
		currentBudgetId,
		data,
		currentPathName,
		setCurrentPathName,
		setCurrentBudgetId,
		setData,
	};

	return (
		<BudgetIdContext.Provider value={contextValue}>
			{children}
		</BudgetIdContext.Provider>
	);
};
