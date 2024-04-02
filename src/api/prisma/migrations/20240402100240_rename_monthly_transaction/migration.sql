/*
  Warnings:

  - You are about to drop the column `monthlyExpense` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `monthlyIncome` on the `Income` table. All the data in the column will be lost.
  - Added the required column `monthlyTransaction` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthlyTransaction` to the `Income` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense" 
RENAME COLUMN "monthlyExpense" TO "monthlyTransaction";
-- AlterTable
ALTER TABLE "Income" 
RENAME COLUMN "monthlyIncome" TO "monthlyTransaction";
