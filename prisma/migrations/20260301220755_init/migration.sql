-- CreateTable
CREATE TABLE "Search" (
    "id" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "sector" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rawResults" JSONB NOT NULL,
    "mentions" JSONB NOT NULL,
    "competitors" JSONB NOT NULL,
    "recommendations" JSONB NOT NULL,
    "visibilityScore" INTEGER,

    CONSTRAINT "Search_pkey" PRIMARY KEY ("id")
);
