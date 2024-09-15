/*
  Warnings:

  - You are about to drop the column `name` on the `collections` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `sites` table. All the data in the column will be lost.
  - You are about to drop the column `webflow_site_token` on the `sites` table. All the data in the column will be lost.
  - Made the column `collection_id` on table `ai_transactions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `collection_item_id` on table `ai_transactions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `collection_field_id` on table `ai_transactions` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `field_type` to the `collection_fields` table without a default value. This is not possible if the table is not empty.
  - Made the column `webflow_field_id` on table `collection_fields` required. This step will fail if there are existing NULL values in that column.
  - Made the column `webflow_item_id` on table `collection_items` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `collection_items` required. This step will fail if there are existing NULL values in that column.
  - Made the column `webflow_collection_id` on table `collections` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `site_token` to the `sites` table without a default value. This is not possible if the table is not empty.
  - Made the column `webflow_site_id` on table `sites` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ai_transactions" DROP CONSTRAINT "ai_transactions_collection_field_id_fkey";

-- DropForeignKey
ALTER TABLE "ai_transactions" DROP CONSTRAINT "ai_transactions_collection_id_fkey";

-- DropForeignKey
ALTER TABLE "ai_transactions" DROP CONSTRAINT "ai_transactions_collection_item_id_fkey";

-- AlterTable
ALTER TABLE "ai_transactions" ADD COLUMN     "ignoredCollectionContext" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "ignoredCollectionFieldContext" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "ignoredCollectionItemContext" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "ignoredSiteContext" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "collection_id" SET NOT NULL,
ALTER COLUMN "collection_item_id" SET NOT NULL,
ALTER COLUMN "collection_field_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "collection_fields" ADD COLUMN     "field_type" TEXT NOT NULL,
ALTER COLUMN "webflow_field_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "collection_items" ALTER COLUMN "webflow_item_id" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL;

-- AlterTable
ALTER TABLE "collections" DROP COLUMN "name",
ALTER COLUMN "webflow_collection_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "sites" DROP COLUMN "source",
DROP COLUMN "webflow_site_token",
ADD COLUMN     "site_token" TEXT NOT NULL,
ALTER COLUMN "webflow_site_id" SET NOT NULL;

-- DropEnum
DROP TYPE "SourceType";

-- AddForeignKey
ALTER TABLE "ai_transactions" ADD CONSTRAINT "ai_transactions_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_transactions" ADD CONSTRAINT "ai_transactions_collection_item_id_fkey" FOREIGN KEY ("collection_item_id") REFERENCES "collection_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_transactions" ADD CONSTRAINT "ai_transactions_collection_field_id_fkey" FOREIGN KEY ("collection_field_id") REFERENCES "collection_fields"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
