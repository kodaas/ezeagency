import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseServiceRole(event)

  const id = getRouterParam(event, 'id')

  if (!id) return { error: 'Invalid ID' }

  const { data, error: deleteError } = await supabase.auth.admin.deleteUser(id)

  if (deleteError) {
    console.log("Error: ", deleteError)
    throw createError({
      statusCode: 400,
      statusMessage: 'ID should be a String',
    })
  }

  console.log("Data: ", data)

  return {data}
})