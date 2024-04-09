import classNames from 'classnames';
import styles from './ContentSection.module.scss';

export type content_sectionidth =
	| 'Skinny'
	| 'Slim'
	| 'Narrow'
	| 'Small'
	| 'Standard'
	| 'Wide'
	| 'Full width'
	| '';

export interface ContentSectionProps {
	id?: string;
	width: content_sectionidth;
	height?: 'Default' | 'Full height';
	fullscreen?: boolean;
	className?: string;
	style?: any;
	center?: boolean;
	noMargin?: boolean;
	noPadding?: boolean;
	backgroundImage?: string;
	headerSpacing?: boolean;
	background?: 'default' | 'light' | 'primary';
	children?: React.ReactNode;
	fade?: boolean;
	fadeState?: 'none' | 'fadeIn' | 'fadeOut' | 'fadeOnRender';
}

export const ContentSection: React.FC<ContentSectionProps> = ({
	id,
	width = 'Standard',
	height,
	className = '',
	style,
	fullscreen = false,
	center = false,
	backgroundImage = '',
	background = 'default',
	noPadding = false,
	noMargin = false,
	headerSpacing,
	fade = false,
	fadeState = 'none',
	children,
}) => {
	width = width === '' ? 'Standard' : width;
	return (
		<section
			id={id}
			className={classNames(
				styles.content_section,
				{ [styles.content_section__standard]: width === 'Standard' },
				{ [styles.content_section__wide]: width === 'Wide' },
				{ [styles.content_section__narrow]: width === 'Small' },
				{ [styles.content_section__slim]: width === 'Narrow' },
				{ [styles.content_section__slim]: width === 'Slim' },
				{ [styles.content_section__skinny]: width === 'Skinny' },
				{ [styles.content_section__full]: width === 'Full width' },
				{ [styles.content_section__fullHeight]: height === 'Full height' },
				{ [styles.content_section__scrollBehavior]: id },
				{ [styles.content_section__background]: !!backgroundImage },
				{ [styles.content_section__fullscreen]: fullscreen },
				{ [styles.content_section__center]: center },
				{ [styles.content_section__noPadding]: noPadding },
				{ [styles.content_section__noMargin]: noMargin },
				{ [styles.content_section__headerSpacing]: headerSpacing },

				styles[`content_section__${background}`],
				styles[`content_section__${fade && fadeState}`],

				className
			)}
			style={{
				backgroundImage: `url(${backgroundImage})`,
				...style,
			}}
		>
			{children}
		</section>
	);
};
