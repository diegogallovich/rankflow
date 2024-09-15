import { verifyLogtoWebhook } from '@/lib/logto';
import prisma from '@/lib/prisma';
import { getEnvVariable } from '@/utils/get-env-variable';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const rawBody = await req.text(); // Get the raw body as a string
  const headers = req.headers;

  // Get the Logto signature from the headers
  const logtoSignature = headers.get('logto-signature-sha-256');
  if (!logtoSignature) {
    return NextResponse.json({ message: 'Logto signature is missing' }, { status: 400 });
  }

  // Verify the signature
  const isValid = await verifyLogtoWebhook(
    getEnvVariable('LOGTO_WEBHOOK_SIGNING_KEY'),
    rawBody,
    logtoSignature
  );
  if (!isValid) {
    return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
  }

  // Process the webhook payload
  const payload = JSON.parse(rawBody);

  // TODO: Handle the webhook event (e.g., PostRegister)
  if (payload.event === 'PostRegister') {
    await handlePostRegister(payload.user);
  }

  return NextResponse.json({ message: 'Webhook received and verified' }, { status: 200 });
}

async function handlePostRegister(user: { id: string }) {
  // Create onboarding record
  const onboarding = await prisma.onboarding.create({
    data: {
      userId: user.id,
    },
  });

  // Create onboarding steps
  await prisma.onboardingStep.createMany({
    data: [
      {
        onboardingId: onboarding.id,
        stepNumber: 1,
        stepName: 'Complete Profile',
      },
      {
        onboardingId: onboarding.id,
        stepNumber: 2,
        stepName: 'Connect First Site',
      },
      {
        onboardingId: onboarding.id,
        stepNumber: 3,
        stepName: 'Connect Site Collections',
      },
      {
        onboardingId: onboarding.id,
        stepNumber: 4,
        stepName: 'Add Context To A Collection',
      },
      {
        onboardingId: onboarding.id,
        stepNumber: 5,
        stepName: 'Edit Your First Collection Item',
      },
    ],
  });
}
