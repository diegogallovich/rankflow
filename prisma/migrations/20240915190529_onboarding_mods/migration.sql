/*
  Warnings:

  - Made the column `step_number` on table `onboarding_steps` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "onboarding_steps" ALTER COLUMN "step_number" SET NOT NULL;
