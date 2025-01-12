/*
  Warnings:

  - You are about to drop the column `crearedAt` on the `Equipament` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Equipament" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "series" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "mark" TEXT NOT NULL,
    "status" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Equipament" ("id", "mark", "model", "series", "status") SELECT "id", "mark", "model", "series", "status" FROM "Equipament";
DROP TABLE "Equipament";
ALTER TABLE "new_Equipament" RENAME TO "Equipament";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
