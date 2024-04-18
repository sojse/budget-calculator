'use client';
import classNames from 'classnames';
import styles from './ModalButtons.module.scss';
import { Button } from '@/ui/components';
import { useRouter } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';

export interface ModalButtonsProps {
	serverAction: any;
}

export const ModalButtons: React.FC<ModalButtonsProps> = (serverAction) => {
	const router = useRouter();
	const formStatus = useFormStatus();

	const goBack = () => {
		router.back();
	};

	return (
		<div className={classNames(styles.modal_buttons)}>
			<Button
				style="primary"
				type="submit"
				//disabled={formInValid}
				className={classNames(styles.modal_buttons_button)}
			>
				Skapa
			</Button>
			<Button
				style="secondary"
				type="button"
				onClick={goBack}
				className={classNames(styles.modal_buttons_button)}
			>
				Avbryt
			</Button>
		</div>
	);
};