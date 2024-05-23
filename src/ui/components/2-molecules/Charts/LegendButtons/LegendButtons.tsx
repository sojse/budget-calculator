'use client';
import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './LegendButtons.module.scss';
import 'chart.js/auto';
import { ChartData } from '@/ui/components';

export interface LegendButtonsProps {
	className?: string;
	chartData: ChartData;
	setData: (data: any) => void;
}

export const LegendButtons: React.FC<LegendButtonsProps> = ({
	chartData,
	setData,
}) => {
	const initialData: boolean[] = [];
	chartData.datasets.forEach((e) => initialData.push(true));
	const [isActive, setisActive] = useState(initialData);

	const toggleData = (index: number) => {
		const newState = isActive;
		newState[index] = !newState[index];
		setisActive(newState);

		setData((prevData: { datasets: any[] }) => ({
			...prevData,
			datasets: prevData.datasets.map((dataset, i) =>
				i === index ? { ...dataset, hidden: !dataset.hidden } : dataset
			),
		}));
	};

	return (
		<div className={classNames(styles.legend_buttons)}>
			{chartData.datasets.map((item, index) => (
				<button
					className={classNames(styles.legend_buttons_legend)}
					onClick={() => toggleData(index)}
					key={index}
				>
					<span
						className={classNames(styles.legend_buttons_legend__dot)}
						style={{
							borderColor: Array.isArray(item.backgroundColor)
								? item.backgroundColor[0]
								: item.backgroundColor,
							backgroundColor: !isActive[index]
								? 'white'
								: Array.isArray(item.backgroundColor)
									? item.backgroundColor[0]
									: item.backgroundColor,
						}}
					></span>
					<span>{item.label}</span>
				</button>
			))}
		</div>
	);
};
