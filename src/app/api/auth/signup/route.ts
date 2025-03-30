import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  'https://nepjqecpzhvyysgebmfx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5lcGpxZWNwemh2eXlzZ2VibWZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyOTc3ODMsImV4cCI6MjA1ODg3Mzc4M30.Vdq7MDTLumZ4pRwwJT7luEn8r33YWC78_glVT53WNws'
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    // Validate input fields
    if (!email || !password || !name) {
      return NextResponse.json({ error: 'All fields (name, email, password) are required' }, { status: 400 });
    }

    // Call Supabase to create the user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Save the user's name in a separate database table (if needed)
    const { error: dbError } = await supabase
      .from('users')
      .insert([{ email, name, password }]);

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'User created successfully', user: { email, name } }, { status: 200 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'An error occurred while creating the user' }, { status: 500 });
  }
}
