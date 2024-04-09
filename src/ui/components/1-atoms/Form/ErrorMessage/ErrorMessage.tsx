import classNames from 'classnames';
import styles from './ErrorMessage.module.scss';

export interface ErrorMessageProps {
	className?: string;
	id: string;
	children?: React.ReactNode;
};

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
	className,
	id,
	children,
}) => (
	<div id={id} className={classNames(styles.error_message, className)}>
		{children}
	</div>
);
