<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"



const isTablet = useMediaQuery('(max-width: 900px)')
</script>

<template>
    <section class="relative w-screen h-screen bg-foreground grid grid-cols-4 p-5">
        <aside v-if="!isTablet" class="text-background">
            <Sidebar />
        </aside>

        <main :class="[!isTablet ? 'col-span-3' : 'col-span-4']" class="bg-background rounded-xl overflow-hidden">
            <slot />
        </main>

        <div v-if="isTablet" class="absolute top-2 left-2">
              <Sheet>
                <SheetTrigger>
                    <Button variant="outline" class="outline">
                        <Icon class="text-xl" name="solar:hamburger-menu-broken" />
                    </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                    <SheetDescription class="text-background bg-foreground h-[90vh]">
                      <Sidebar />
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
        </div>
    </section>
</template>