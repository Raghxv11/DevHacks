// pages/api/auth/signup.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import supabase from '../../../lib/supabaseClient'

type Data = {
  message?: string
  error?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body

    // Check if all fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Create a new user in the Supabase Auth table
    const { user, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) {
      return res.status(400).json({ error: authError.message })
    }

    // Insert the additional user details (username) into your "profiles" table
    const { data, error: dbError } = await supabase
      .from('profiles')
      .insert([
        {
          user_id: user?.id,
          username: username,
        },
      ])

    if (dbError) {
      return res.status(400).json({ error: dbError.message })
    }

    return res.status(200).json({ message: 'User created successfully', data })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
