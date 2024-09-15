-- CreateTable
CREATE TABLE "onboardings" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "currentStep" INTEGER NOT NULL DEFAULT 1,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "skippedAt" TIMESTAMP(3),
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "lastUpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "onboardings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "onboarding_steps" (
    "id" TEXT NOT NULL,
    "onboardingId" TEXT NOT NULL,
    "stepNumber" INTEGER NOT NULL,
    "stepName" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "onboarding_steps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "onboardings_user_id_key" ON "onboardings"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "onboarding_steps_onboardingId_stepNumber_key" ON "onboarding_steps"("onboardingId", "stepNumber");

-- AddForeignKey
ALTER TABLE "onboarding_steps" ADD CONSTRAINT "onboarding_steps_onboardingId_fkey" FOREIGN KEY ("onboardingId") REFERENCES "onboardings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
