export const capitalizeFirstLetter = (string: string): string =>
	string.charAt(0).toUpperCase() + string.slice(1);



export const buildNavigationString = (string1: string, string2: string) => {
	return `${string1}/${string2}`;
};

export const buildBudgetTitle = (string1: string, string2: string) => {
	return `${capitalizeFirstLetter(string1)} ${string2}`;
};