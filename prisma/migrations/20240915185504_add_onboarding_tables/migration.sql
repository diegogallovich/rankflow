/*
  Warnings:

  - You are about to drop the column `completedAt` on the `onboarding_steps` table. All the data in the column will be lost.
  - You are about to drop the column `isCompleted` on the `onboarding_steps` table. All the data in the column will be lost.
  - You are about to drop the column `onboardingId` on the `onboarding_steps` table. All the data in the column will be lost.
  - You are about to drop the column `startedAt` on the `onboarding_steps` table. All the data in the column will be lost.
  - You are about to drop the column `stepName` on the `onboarding_steps` table. All the data in the column will be lost.
  - You are about to drop the column `stepNumber` on the `onboarding_steps` table. All the data in the column will be lost.
  - You are about to drop the column `completedAt` on the `onboardings` table. All the data in the column will be lost.
  - You are about to drop the column `currentStep` on the `onboardings` table. All the data in the column will be lost.
  - You are about to drop the column `isCompleted` on the `onboardings` table. All the data in the column will be lost.
  - You are about to drop the column `lastUpdatedAt` on the `onboardings` table. All the data in the column will be lost.
  - You are about to drop the column `skippedAt` on the `onboardings` table. All the data in the column will be lost.
  - You are about to drop the column `startedAt` on the `onboardings` table. All the data in the column will be lost.
  - Added the required column `completed_at` to the `onboarding_steps` table without a default value. This is not possible if the table is not empty.
  - Added the required column `onboarding_id` to the `onboarding_steps` table without a default value. This is not possible if the table is not empty.
  - Added the required column `started_at` to the `onboarding_steps` table without a default value. This is not possible if the table is not empty.
  - Added the required column `step_name` to the `onboarding_steps` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_updated_at` to the `onboardings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "onboarding_steps" DROP CONSTRAINT "onboarding_steps_onboardingId_fkey";

-- DropIndex
DROP INDEX "onboarding_steps_onboardingId_stepNumber_key";

-- AlterTable
ALTER TABLE "onboarding_steps" DROP COLUMN "completedAt",
DROP COLUMN "isCompleted",
DROP COLUMN "onboardingId",
DROP COLUMN "startedAt",
DROP COLUMN "stepName",
DROP COLUMN "stepNumber",
ADD COLUMN     "completed_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "is_completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "onboarding_id" TEXT NOT NULL,
ADD COLUMN     "started_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "step_name" TEXT NOT NULL,
ADD COLUMN     "step_number" INTEGER;

-- AlterTable
ALTER TABLE "onboardings" DROP COLUMN "completedAt",
DROP COLUMN "currentStep",
DROP COLUMN "isCompleted",
DROP COLUMN "lastUpdatedAt",
DROP COLUMN "skippedAt",
DROP COLUMN "startedAt",
ADD COLUMN     "completed_at" TIMESTAMP(3),
ADD COLUMN     "current_step" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "is_completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "last_updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "skipped_at" TIMESTAMP(3),
ADD COLUMN     "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "onboarding_steps" ADD CONSTRAINT "onboarding_steps_onboarding_id_fkey" FOREIGN KEY ("onboarding_id") REFERENCES "onboardings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
