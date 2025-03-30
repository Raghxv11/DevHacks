// /src/app/api/auth/signin.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  'https://nepjqecpzhvyysgebmfx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5lcGpxZWNwemh2eXlzZ2VibWZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyOTc3ODMsImV4cCI6MjA1ODg3Mzc4M30.Vdq7MDTLumZ4pRwwJT7luEn8r33YWC78_glVT53WNws'
);

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Sign-in successful', user: data.user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
