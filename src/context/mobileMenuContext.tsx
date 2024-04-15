'use client';
import React, { createContext, useState } from 'react';

export interface MobileMenuState {
	mobileMenuOpen: boolean;
	toggleMenu: (state: boolean) => void;
}

export const MobileMenuContext = createContext<MobileMenuState>({
	mobileMenuOpen: false,
	toggleMenu: (state) => {},
});

export const MobileMenuProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const toggleMenu = (state: boolean) => {
		setMobileMenuOpen(state);
	};

	return (
		<MobileMenuContext.Provider value={{ mobileMenuOpen, toggleMenu }}>
			{children}
		</MobileMenuContext.Provider>
	);
};
