import { showToast } from '@/helpers/toast';
import { useRouter } from 'next/navigation';
import { useFormState } from 'react-dom';
import { useBudgetId } from './useBudgetId';

export const useFormStateHook = (
	action: (currentState: any, formData: FormData) => Promise<any>,
	initialState: any,
	successMessage: string,
	errorMessage: string
) => {
	const router = useRouter();
	const { currentPathName } = useBudgetId();
	const [state, formAction] = useFormState(action, initialState);

	if (state.success) {
		if (state.newRoute !== undefined) {
			router.push(state.newRoute, { scroll: false });
			showToast('success', <span>{successMessage}</span>);
		} else {
			router.push(currentPathName, { scroll: false });
			showToast('success', <span>{successMessage}</span>);
		}
		router.refresh();
	} else if (state.error) {
		router.back();
		showToast('error', <span>{errorMessage}</span>);
	}

	return { state, formAction };
};
