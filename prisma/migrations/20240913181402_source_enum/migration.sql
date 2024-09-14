/*
  Warnings:

  - Changed the type of `source` on the `sites` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SourceType" AS ENUM ('rankflow', 'webflow');

-- AlterTable
ALTER TABLE "sites" DROP COLUMN "source",
ADD COLUMN     "source" "SourceType" NOT NULL;
