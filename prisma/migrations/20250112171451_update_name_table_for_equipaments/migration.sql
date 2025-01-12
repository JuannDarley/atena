/*
  Warnings:

  - You are about to drop the `Equipament` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Equipament";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "equipaments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "series" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "mark" TEXT NOT NULL,
    "status" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
