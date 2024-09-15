import { NextResponse } from 'next/server';
import formData from 'form-data';
import Mailgun from 'mailgun.js';
import { getEnvVariable } from '@/utils/get-env-variable';

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: getEnvVariable('MAILGUN_API_KEY'),
});

export async function POST(request: Request) {
  const { email, url, userAgent } = await request.json();

  const messageData = {
    from: getEnvVariable('MAILGUN_FROM_EMAIL'),
    to: 'diego@rankflow.ai',
    subject: 'BUG REPORT: User keeps seeing auth gate',
    text: `
      A user reported an issue with accessing the site:
      
      User Email: ${email}
      URL: ${url}
      User Agent: ${userAgent}
    `,
  };

  try {
    await mg.messages.create(getEnvVariable('MAILGUN_DOMAIN'), messageData);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}
