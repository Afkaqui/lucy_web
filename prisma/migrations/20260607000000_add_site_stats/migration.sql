-- CreateTable
CREATE TABLE "site_stats" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "page_views" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "site_stats_pkey" PRIMARY KEY ("id")
);

-- Initialize the single-row counter
INSERT INTO "site_stats" ("id", "page_views", "updated_at")
VALUES (1, 0, NOW())
ON CONFLICT ("id") DO NOTHING;
