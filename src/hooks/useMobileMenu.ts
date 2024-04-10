import { useContext } from 'react';
import { MobileMenuContext } from '@/context/mobileMenuContext';

export const useMobileMenu = () => {
	return useContext(MobileMenuContext);
};
