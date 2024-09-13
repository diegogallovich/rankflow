/*
  Warnings:

  - You are about to drop the `AITransaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Collection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CollectionField` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CollectionItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Site` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AITransaction" DROP CONSTRAINT "AITransaction_collectionFieldId_fkey";

-- DropForeignKey
ALTER TABLE "AITransaction" DROP CONSTRAINT "AITransaction_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "AITransaction" DROP CONSTRAINT "AITransaction_collectionItemId_fkey";

-- DropForeignKey
ALTER TABLE "AITransaction" DROP CONSTRAINT "AITransaction_siteId_fkey";

-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_siteId_fkey";

-- DropForeignKey
ALTER TABLE "CollectionField" DROP CONSTRAINT "CollectionField_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "CollectionField" DROP CONSTRAINT "CollectionField_siteId_fkey";

-- DropForeignKey
ALTER TABLE "CollectionItem" DROP CONSTRAINT "CollectionItem_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "CollectionItem" DROP CONSTRAINT "CollectionItem_siteId_fkey";

-- DropTable
DROP TABLE "AITransaction";

-- DropTable
DROP TABLE "Collection";

-- DropTable
DROP TABLE "CollectionField";

-- DropTable
DROP TABLE "CollectionItem";

-- DropTable
DROP TABLE "Site";

-- CreateTable
CREATE TABLE "sites" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "webflow_site_id" TEXT,
    "context" TEXT NOT NULL,
    "webflow_site_token" TEXT,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "collections" (
    "id" TEXT NOT NULL,
    "webflow_collection_id" TEXT,
    "name" TEXT NOT NULL,
    "context" TEXT NOT NULL,
    "site_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "collections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "collection_items" (
    "id" TEXT NOT NULL,
    "webflow_item_id" TEXT,
    "target_keyword" TEXT,
    "context" TEXT,
    "status" TEXT,
    "collection_id" TEXT NOT NULL,
    "site_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "collection_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "collection_fields" (
    "id" TEXT NOT NULL,
    "webflow_field_id" TEXT,
    "name" TEXT NOT NULL,
    "context" TEXT,
    "collection_id" TEXT NOT NULL,
    "site_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "collection_fields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_transactions" (
    "id" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "input" INTEGER NOT NULL,
    "output" INTEGER NOT NULL,
    "site_id" TEXT NOT NULL,
    "collection_id" TEXT,
    "collection_item_id" TEXT,
    "collection_field_id" TEXT,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_transactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "collections" ADD CONSTRAINT "collections_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "sites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collection_items" ADD CONSTRAINT "collection_items_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collection_items" ADD CONSTRAINT "collection_items_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "sites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collection_fields" ADD CONSTRAINT "collection_fields_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collection_fields" ADD CONSTRAINT "collection_fields_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "sites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_transactions" ADD CONSTRAINT "ai_transactions_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "sites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_transactions" ADD CONSTRAINT "ai_transactions_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collections"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_transactions" ADD CONSTRAINT "ai_transactions_collection_item_id_fkey" FOREIGN KEY ("collection_item_id") REFERENCES "collection_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_transactions" ADD CONSTRAINT "ai_transactions_collection_field_id_fkey" FOREIGN KEY ("collection_field_id") REFERENCES "collection_fields"("id") ON DELETE SET NULL ON UPDATE CASCADE;
