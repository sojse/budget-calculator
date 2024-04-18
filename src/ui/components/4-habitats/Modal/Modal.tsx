'use client';
import classNames from 'classnames';
import styles from './Modal.module.scss';
import Close from '@/ui/icons/icon-close.svg';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export interface ModalProps {
	children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ children }) => {
	const router = useRouter();
	const clickOutsideRef = useRef<HTMLDivElement | null>(null);

	const closeModal = () => {
		router.back();
	};

	const handleOutsideClick = (e: any) => {
		if (
			clickOutsideRef.current &&
			!clickOutsideRef.current.contains(e.target)
		) {
			closeModal();
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleOutsideClick);
		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, []);

	return (
		<div className={classNames(styles.modal_container)}>
			<section className={classNames(styles.modal)} ref={clickOutsideRef}>
				<button
					className={classNames(styles.modal_button)}
					onClick={closeModal}
				>
					<Close className={classNames(styles.modal_icon)} />
				</button>
				{children}
			</section>
		</div>
	);
};
