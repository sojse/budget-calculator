export const isValidDate = (dateString: string) => {
	const date = new Date(dateString);
	return !isNaN(date.getTime());
};

export const extractYear = (dateString: string) => {
	const date = new Date(dateString);
	const year = date.getFullYear().toString();
	return year;
};

export const getDateRange = (dateRange: string | null) => {
	if (!dateRange) return { startDate: '', endDate: '' };
	const [startDateStr, endDateStr] = dateRange.toString().split(' - ');
	return {
		startDate: new Date(startDateStr).toISOString(),
		endDate: new Date(endDateStr).toISOString(),
	};
};