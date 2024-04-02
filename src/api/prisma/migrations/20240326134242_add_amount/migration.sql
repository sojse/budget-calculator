/*
  Warnings:

  - Added the required column `amount` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `Income` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "amount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Income" ADD COLUMN     "amount" INTEGER NOT NULL;
