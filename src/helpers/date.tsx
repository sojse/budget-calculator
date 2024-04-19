export const isValidDate = (dateString: string) => {
	const date = new Date(dateString);
	return !isNaN(date.getTime());
};

export const extractYear = (dateString: string) => {
	const date = new Date(dateString);
	const year = date.getFullYear().toString();
	return year;
};
