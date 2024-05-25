<script setup lang="ts">
const route = useRoute();
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

const isTablet = useMediaQuery("(max-width: 768px)");
</script>

<template>
    <div class="relative grid grid-cols-7 h-full">
        <section
            :class="{ 'col-span-5': !isTablet, 'col-span-7': isTablet }"
            class="overflow-y-auto"
        >
            <nav class="pl-10 pt-10 pr-3 pb-3">
                <h1 class="font-medium text-2xl">Dashboard</h1>
            </nav>

            <section class="w-full max-w-xl mx-auto p-5 space-y-5">
                <header class="space-y-5">
                    <div class="flex items-start justify-between">
                        <div class="space-y-1">
                            <h1 class="font-bold text-2xl">Modules</h1>
                            <p class="text-gray-400 text-sm">
                                3 of 15 Completed
                            </p>
                        </div>

                        <NuxtLink
                            to="/classroom?module=84559be9-31e1-4cbe-9b52-87832ace7a20&section=fcedf409-3175-41fd-b8a4-3514cf64f48e"
                        >
                            <Button class="bg-foreground w-32">Continue</Button>
                        </NuxtLink>
                    </div>

                    <div
                        class="relative overflow-hidden bg-primary-foreground rounded-3xl h-20"
                    >
                        <div class="absolute top-0 right-0 p-2 pr-3">
                            <img src="@/assets/img/plant.png" alt="" />
                        </div>
                        <div
                            class="bg-primary w-[40%] rounded-3xl h-full grid place-items-center"
                        >
                            <p class="text-white font-medium text-lg">40%</p>
                        </div>
                    </div>
                </header>

                <ModuleList />
            </section>
        </section>

        <aside
            v-if="!isTablet"
            class="bg-slate-100 col-span-2 h-full p-8 space-y-3"
        >
            <Card>
                <CardHeader
                    class="flex flex-row items-center justify-between space-y-0 pb-2"
                >
                    <CardTitle class="text-sm font-medium">
                        Certificates
                    </CardTitle>
                    <Icon
                        class="h-4 w-4 text-muted-foreground"
                        name="solar:document-add-outline"
                    />
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold">3</div>
                    <p class="text-xs text-muted-foreground">
                        +12 more to complete
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader
                    class="flex flex-row items-center justify-between space-y-0 pb-2"
                >
                    <CardTitle class="text-sm font-medium">
                        Certificates
                    </CardTitle>
                    <Icon
                        class="h-4 w-4 text-muted-foreground"
                        name="solar:document-add-outline"
                    />
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold">3</div>
                    <p class="text-xs text-muted-foreground">
                        +12 more to complete
                    </p>
                </CardContent>
            </Card>
        </aside>

        <div
            v-if="isTablet"
            class="absolute w-full bottom-0 right-0 flex pb-5 items-center justify-center"
        >
            <Drawer>
                <DrawerTrigger>
                    <Button class="shadow-lg">
                        <Icon
                            class="text-lg mr-2"
                            name="solar:chart-2-bold-duotone"
                        />
                        Stats
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Stats</DrawerTitle>
                        <DrawerDescription>
                            This action cannot be undone.
                            <Card>
                                <CardHeader
                                    class="flex flex-row items-center justify-between space-y-0 pb-2"
                                >
                                    <CardTitle class="text-sm font-medium">
                                        Certificates
                                    </CardTitle>
                                    <Icon
                                        class="h-4 w-4 text-muted-foreground"
                                        name="solar:document-add-outline"
                                    />
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
