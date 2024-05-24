<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from '@/components/ui/toast/use-toast'

const supabase = useSupabaseClient()
const { toast } = useToast()
const isLoading = ref(false)

const logout = async () => {
    isLoading.value = true
    const { error } = await supabase.auth.signOut()

    if (error) {
        console.log(error)
        isLoading.value = false
        return
    }

    isLoading.value = false
    toast({
        title: 'Success',
        description: 'You have been logged out',
        variant: "success"
    })
    navigateTo('/auth/login')
}

</script>

<template>
    <section class="h-full p-10 flex flex-col justify-between it">
        <div class="space-y-3">
            <div class="w-20 rounded-lg overflow-hidden">
                <img class="w-full"
                    src="https://ui-avatars.com/api/?name=John+Ajala&background=877D7D&color=fff&size=300"
                    alt="Profile">
            </div>

            <div class="space-y-1">
                <h3 class="text-2xl text-white">John Ajala</h3>
                <p class="text-gray-400 text-sm">johnajala@example.com</p>
                <Badge variant="secondary">User</Badge>
            </div>
        </div>

        <ul class="text-lg text-gray-400 space-y-5">
            <li>
                <NuxtLink class="hover:text-white" activeClass="font-bold text-white" to="/"> Dashboard </NuxtLink>
            </li>

            <li>
                <NuxtLink class="hover:text-white" activeClass="font-bold text-white" to="/certificate"> Certificate
                </NuxtLink>
            </li>

            <li>
                <NuxtLink class="hover:text-white" activeClass="font-bold text-white" to="/questions"> My Questions
                </NuxtLink>
            </li>

            <li>
                <NuxtLink class="hover:text-white" activeClass="font-bold text-white" to="/setting"> Settings
                </NuxtLink>
            </li>
        </ul>

        <div>
            <Button :disabled="isLoading" @click="logout" variant="outline" class="space-x-2 bg-transparent">
                <Icon v-if="isLoading" name="svg-spinners:ring-resize" />

                <Icon v-if="!isLoading" class="text-lg" name="solar:logout-3-line-duotone" />
                <p v-if="!isLoading">Logout</p>


            </Button>
        </div>
    </section>
</template>

<style scoped></style>