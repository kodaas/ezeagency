<script setup lang="ts">
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@vueuse/core";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"


const isTablet = useMediaQuery("(max-width: 768px)");
const { data: User, pending: UserPending, execute: executeUser } = useLazyAsyncData("User", () => MetaDataService().getMetaData(), {immediate: false})
const { data: Modules, pending: ModulesPending, execute: executeModules } = useLazyAsyncData("Modules", () => ModuleService().getModules(), {immediate: false});
const pending = ref(true)

onMounted(async () => {
    pending.value = true
    await executeUser()
    await executeModules()
    pending.value = false
})
</script>

<template>
    <div class="w-full h-full grid place-items-center place-content-center" v-if="pending">
        <Logo class="w-32 animate-pulse" />
        <Loader />
    </div>

    <div v-else class="relative grid grid-cols-7 h-full">
        <section :class="{ 'col-span-5': !isTablet, 'col-span-7': isTablet }" class="overflow-y-auto">
            <nav class="pl-10 pt-10 pr-3 pb-3">
                <h1 class="font-medium text-2xl">Dashboard</h1>
            </nav>

            <section class="w-full max-w-xl mx-auto p-5 space-y-5">
                <header class="space-y-5">
                    <div class="flex items-start justify-between">
                        <div class="space-y-1">
                            <h1 class="font-bold text-2xl">Modules</h1>
                            <p class="text-gray-400 text-sm">
                                {{ User?.number_of_completed_modules }} of {{ Modules?.length }} Completed
                            </p>
                        </div>
                        
                        <Badge v-if="User?.number_of_completed_modules === Modules?.length" variant="secondary">All Module Completed</Badge>

                        <NuxtLink v-else :to="`/classroom/${User?.active_module}/${User?.active_section}`">
                            <Button class="bg-foreground w-32">Jump Right In 🔥</Button>
                        </NuxtLink>
                    </div>

                    <div class="relative overflow-hidden bg-primary-foreground rounded-3xl h-20">
                        <div class="absolute top-0 right-0 p-2 pr-3">
                            <img src="@/assets/img/plant.png" alt="" />
                        </div>
                        <div v-if="User?.progress! > 0" :style="`width: ${User?.progress}%`"
                            class="bg-primary rounded-3xl h-full grid place-items-center">
                            <p class="text-white font-medium text-lg">
                                {{ User?.progress }}%
                            </p>
                        </div>

                        <div v-else class="w-full h-full grid place-items-center">
                            <p class="text-gray-500 font-medium text-lg">
                                0%
                            </p>
                        </div>
                    </div>
                </header>
                <ModuleList :modules="Modules!" :active="User?.active_module!" :activeSection="User?.active_section!" />
            </section>
        </section>

        <aside v-if="!isTablet" class="bg-slate-100 col-span-2 h-full p-8 space-y-3">
            <NuxtLink class="block" to="/certificate">
                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">
                            Certificates
                        </CardTitle>
                        <Icon class="h-4 w-4 text-muted-foreground" name="solar:document-add-outline" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">{{ User?.number_of_certificate }}</div>
                        <p class="text-xs text-muted-foreground">
                            +{{ Modules?.length! - User?.number_of_certificate! }} more to complete
                        </p>
                    </CardContent>
                </Card>
            </NuxtLink>

            <NuxtLink class="block" to="/questions">
                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">
                            Questions
                        </CardTitle>
                        <Icon class="h-4 w-4 text-muted-foreground" name="solar:document-add-outline" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">{{ User?.number_of_questions }}</div>
                        <p class="text-xs text-muted-foreground">+{{ User?.number_of_answered_questions }} Answered</p>
                    </CardContent>
                </Card>
            </NuxtLink>
        </aside>

        <div v-if="isTablet" class="absolute w-full bottom-0 right-0 flex pb-5 items-center justify-center">
            <Drawer>
                <DrawerTrigger>
                    <Button class="shadow-lg">
                        <Icon class="text-lg mr-2" name="solar:chart-2-bold-duotone" />
                        Stats
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Stats</DrawerTitle>
                        <DrawerDescription>
                            This action cannot be undone.
                            <Card>
                                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle class="text-sm font-medium">
                                        Certificates
                                    </CardTitle>
                                    <Icon class="h-4 w-4 text-muted-foreground" name="solar:document-add-outline" />
                                </CardHeader>
                                <CardContent>
                                    <div class="text-2xl font-bold">3</div>
                                    <p class="text-xs text-muted-foreground">
                                        +12 more to complete
                                    </p>
                                </CardContent>
                            </Card>
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                        <DrawerClose>
                            <Button variant="destructive"> Close </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    </div>
</template>
