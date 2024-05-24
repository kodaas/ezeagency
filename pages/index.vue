<script setup lang="ts">
const route = useRoute()
import { Button } from "@/components/ui/button"

const supabase = useSupabaseClient()

const logout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.log(error)
  }

  navigateTo('/auth/login')
}


</script>

<template>
  
  <Button @click="logout" variant="outline">Logout</Button>

</template>
