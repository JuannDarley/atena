-- CreateTable
CREATE TABLE "Preventive" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "equipamentId" TEXT NOT NULL,
    "equipament_hours" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "preventive_HUB" BOOLEAN NOT NULL DEFAULT false,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "reponsible" TEXT NOT NULL,
    CONSTRAINT "Preventive_equipamentId_fkey" FOREIGN KEY ("equipamentId") REFERENCES "Equipament" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
