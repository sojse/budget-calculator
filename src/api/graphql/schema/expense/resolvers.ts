import { GraphQLScalarType, Kind } from 'graphql';
import prisma from '@/api/prisma/db';

export const ExpenseResolver = {
	CategoryType: new GraphQLScalarType({
		name: 'CategoryType',
		description: 'Category types enum',
		parseValue(value) {
			return value;
		},
		parseLiteral(ast) {
			if (ast.kind === Kind.STRING) {
				return ast.value;
			}
			return null;
		},
		serialize(value: any) {
			return value;
		},
	}),
};
