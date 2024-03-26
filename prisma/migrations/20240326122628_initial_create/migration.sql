-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('ENTERTAINMENT', 'HOME', 'SAVINGS', 'SHOPPING', 'TRANSPORTATION', 'OTHER');

-- CreateTable
CREATE TABLE "Budget" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Budget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Income" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "monthlyIncome" BOOLEAN NOT NULL,

    CONSTRAINT "Income_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryType" "CategoryType" NOT NULL,
    "monthlyExpense" BOOLEAN NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BudgetToExpense" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_BudgetToIncome" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BudgetToExpense_AB_unique" ON "_BudgetToExpense"("A", "B");

-- CreateIndex
CREATE INDEX "_BudgetToExpense_B_index" ON "_BudgetToExpense"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BudgetToIncome_AB_unique" ON "_BudgetToIncome"("A", "B");

-- CreateIndex
CREATE INDEX "_BudgetToIncome_B_index" ON "_BudgetToIncome"("B");

-- AddForeignKey
ALTER TABLE "_BudgetToExpense" ADD CONSTRAINT "_BudgetToExpense_A_fkey" FOREIGN KEY ("A") REFERENCES "Budget"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BudgetToExpense" ADD CONSTRAINT "_BudgetToExpense_B_fkey" FOREIGN KEY ("B") REFERENCES "Expense"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BudgetToIncome" ADD CONSTRAINT "_BudgetToIncome_A_fkey" FOREIGN KEY ("A") REFERENCES "Budget"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BudgetToIncome" ADD CONSTRAINT "_BudgetToIncome_B_fkey" FOREIGN KEY ("B") REFERENCES "Income"("id") ON DELETE CASCADE ON UPDATE CASCADE;
