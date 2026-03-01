-- CreateTable
CREATE TABLE "Search" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "domain" TEXT NOT NULL,
    "sector" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rawResults" JSONB NOT NULL,
    "mentions" JSONB NOT NULL,
    "competitors" JSONB NOT NULL,
    "recommendations" JSONB NOT NULL,
    "visibilityScore" INTEGER
);
