
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.2.0'

// Create a Supabase client with the user's JWT token
const supabaseClient = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_ANON_KEY') ?? '',
  {
    global: {
      headers: { Authorization: `Bearer ${Deno.env.get('SUPABASE_AUTH_TOKEN')}` },
    },
  }
)

Deno.serve(async (req) => {
  // Get the token from the authorization header
  const authHeader = req.headers.get('Authorization')
  if (!authHeader) {
    return new Response(
      JSON.stringify({ error: 'Missing authorization header' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    )
  }

  // Extract the JWT token
  const token = authHeader.replace('Bearer ', '')

  try {
    // Get the authenticated user from the token
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token)

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Check if the user has an admin role
    const { data: roleData, error: roleError } = await supabaseClient
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .single()

    if (roleError) {
      console.error('Error checking admin role:', roleError)
      return new Response(
        JSON.stringify({ error: 'Failed to check admin status' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Return whether the user is an admin or not
    return new Response(
      JSON.stringify({ isAdmin: !!roleData }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in is-admin function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
