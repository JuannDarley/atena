/*
  Warnings:

  - You are about to drop the `equipaments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "equipaments";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Equipament" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "series" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "mark" TEXT NOT NULL,
    "status" INTEGER,
    "crearedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
