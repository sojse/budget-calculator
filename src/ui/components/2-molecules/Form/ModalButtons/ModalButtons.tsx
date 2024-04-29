'use client';
import classNames from 'classnames';
import styles from './ModalButtons.module.scss';
import { Button } from '@/ui/components';
import { useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import Trash from '@/ui/icons/icon-trash.svg';

export interface ModalButtonsProps {
	buttonText: string;
	deleteButton?: boolean;
}

export const ModalButtons: React.FC<ModalButtonsProps> = ({
	buttonText,
	deleteButton,
}) => {
	const router = useRouter();
	const { pending } = useFormStatus();

	const goBack = () => {
		router.back();
	};

	return (
		<div className={classNames(styles.modal_buttons)}>
			<Button
				style="primary"
				type="submit"
				disabled={pending}
				className={classNames(styles.modal_buttons_button)}
			>
				{pending ? 'Laddar...' : buttonText}
				{deleteButton && !pending && (
					<Trash className={classNames(styles.modal_buttons__delete)} />
				)}
			</Button>
			<Button
				style="secondary"
				type="button"
				disabled={pending}
				onClick={goBack}
				className={classNames(styles.modal_buttons_button)}
			>
				Avbryt
			</Button>
		</div>
	);
};
