import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = req.body;

  console.log(body);

  return NextResponse.json({ message: 'Webhook received' });
}
