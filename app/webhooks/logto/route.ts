import { verifyLogtoWebhook } from '@/lib/logto';
import { getEnvVariable } from '@/utils/get-env-variable';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // verify the request with the logto webhook signing key
  const signature = req.headers.get('logto-signature-sha-256');
  const body = req.body;

  if (!body) {
    return NextResponse.json({ message: 'No body' }, { status: 400 });
  }

  if (!signature) {
    return NextResponse.json({ message: 'No signature' }, { status: 400 });
  }

  const isValid = verifyLogtoWebhook(getEnvVariable('LOGTO_WEBHOOK_SIGNING_KEY'), body, signature);

  //log the body in a readable format
  console.log(await req.json());

  if (!isValid) {
    return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
  } else {
    // Handle registration event
    return NextResponse.json({ message: 'Webhook received with valid signature' });
  }
}
