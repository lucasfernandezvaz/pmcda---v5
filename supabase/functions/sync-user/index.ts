import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface WebhookPayload {
  type: string
  table: string
  record: any
  schema: string
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const payload: WebhookPayload = await req.json()

    // Quando um usuário é criado no auth.users, criar entrada na tabela usuarios
    if (payload.type === 'INSERT' && payload.table === 'users') {
      const { id, email, user_metadata } = payload.record

      await supabaseClient
        .from('usuarios')
        .insert({
          id,
          nome: user_metadata?.nome || email.split('@')[0],
          tipo: 'aluno'
        })
    }

    return new Response('ok', { headers: corsHeaders })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})