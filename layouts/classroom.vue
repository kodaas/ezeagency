<script setup lang="ts">
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { useMediaQuery } from '@vueuse/core'

const isTablet = useMediaQuery('(max-width: 768px)')
</script>

<template>
    <section class="relative w-screen h-screen bg-foreground grid grid-cols-1 p-5">
        <main class="bg-background rounded-xl overflow-hidden grid grid-cols-7">

            <section :class="{ 'col-span-5': !isTablet, 'col-span-7': isTablet }" class="h-full overflow-hidden">
                <nav class="lg:pl-10 pl-5 pt-5 lg:pt-10 pr-3 pb-3">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink>
                                    <a href="/">
                                        Home
                                    </a>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Classroom</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <div class="flex justify-between items-end">
                        <h1 class="font-medium text-2xl mt-5">Classroom</h1>

                        <Sheet v-if="isTablet">
                            <SheetTrigger>
                                <Button variant="outline">My Progress <Icon class="text-lg" name="solar:alt-arrow-right-line-duotone" /></Button>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>My Progress</SheetTitle>
                                    <SheetDescription>
                                        <slot name="sidebar" />
                                    </SheetDescription>
                                </SheetHeader>
                            </SheetContent>
                        </Sheet>

                    </div>

                </nav>

                <section class="px-5 lg:px-10">

                    <slot />

                </section>
            </section>

            <aside v-if="!isTablet" class="bg-slate-100 col-span-2 h-full overflow-hidden p-8 space-y-3">
                <slot name="sidebar" />
            </aside>
        </main>
    </section>
</template>