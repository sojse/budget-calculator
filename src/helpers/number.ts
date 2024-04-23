export const formatCost = (cost: number) => {
	const [integerPart, decimalPart] = cost.toString().split('.');

	const formattedIntegerPart = integerPart.replace(
		/\B(?=(\d{3})+(?!\d))/g,
		' '
	);

	const formattedCost = decimalPart
		? `${formattedIntegerPart},${decimalPart}`
		: formattedIntegerPart;

	return formattedCost;
};
