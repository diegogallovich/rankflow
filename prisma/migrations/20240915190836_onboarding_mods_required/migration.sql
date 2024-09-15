/*
  Warnings:

  - You are about to drop the column `current_step` on the `onboardings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "onboarding_steps" ALTER COLUMN "completed_at" DROP NOT NULL,
ALTER COLUMN "started_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "onboardings" DROP COLUMN "current_step";
