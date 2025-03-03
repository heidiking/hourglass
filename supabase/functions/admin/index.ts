
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.2.0'

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Create a Supabase client with the service role key
const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

// This function is called when a POST request is made to this endpoint
Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }
  
  try {
    // Verify the user is authenticated and is an admin
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    // Extract the JWT token
    const token = authHeader.replace('Bearer ', '')
    
    // Verify the token and get the user
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token)
    
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    // Check if the user is an admin
    const { data: roleData, error: roleError } = await supabaseAdmin
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .single()
    
    if (roleError || !roleData) {
      return new Response(
        JSON.stringify({ error: 'Not authorized' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    // Parse the request body to get the action and data
    const { action, data } = await req.json()
    
    // Handle different admin actions
    let result
    
    switch (action) {
      case 'getUsers':
        // Get all users with their roles
        const { data: users, error: usersError } = await supabaseAdmin.auth.admin.listUsers()
        
        if (usersError) {
          throw usersError
        }
        
        // Get admin roles for all users
        const { data: roles, error: rolesError } = await supabaseAdmin
          .from('user_roles')
          .select('user_id, role')
          .eq('role', 'admin')
        
        if (rolesError) {
          throw rolesError
        }
        
        // Map roles to users
        const usersWithRoles = users.users.map(user => {
          const isAdmin = roles.some(role => role.user_id === user.id)
          return {
            id: user.id,
            email: user.email,
            created_at: user.created_at,
            isAdmin,
          }
        })
        
        result = { users: usersWithRoles }
        break
      
      case 'makeAdmin':
        // Ensure userId is provided
        if (!data?.userId) {
          throw new Error('userId is required')
        }
        
        const { error: insertError } = await supabaseAdmin
          .from('user_roles')
          .insert({ user_id: data.userId, role: 'admin' })
        
        if (insertError) {
          throw insertError
        }
        
        result = { success: true }
        break
      
      case 'removeAdmin':
        // Ensure userId is provided
        if (!data?.userId) {
          throw new Error('userId is required')
        }
        
        const { error: deleteError } = await supabaseAdmin
          .from('user_roles')
          .delete()
          .eq('user_id', data.userId)
          .eq('role', 'admin')
        
        if (deleteError) {
          throw deleteError
        }
        
        result = { success: true }
        break
      
      default:
        throw new Error(`Unknown action: ${action}`)
    }
    
    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error processing request:', error)
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
