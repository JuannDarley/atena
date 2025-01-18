-- CreateTable
CREATE TABLE "Equipament" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "series" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "mark" TEXT NOT NULL,
    "status" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
