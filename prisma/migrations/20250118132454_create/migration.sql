-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "login" TEXT,
    "senha" TEXT,
    "email" TEXT NOT NULL,
    "position" TEXT NOT NULL
);
