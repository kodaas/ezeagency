<script setup lang="ts">
import { Button } from "@/components/ui/button"

const props = {
    id: "dklj3920ej2oe239e3el",
    module: {
        number: 3,
        title: "Insurance Advantages and Disadvantages"
    },
    numberOfSections: 5,
    totalDuration: 3600000,
    progress: 100,

}

</script>

<template>
    <div class="w-full border-2 border-primary bg-primary-foreground rounded-lg p-5 space-y-12 hover:scale-105 transition-all">
        <nav class="space-y-1">
            <div class="h-1.5 rounded-lg overflow-hidden bg-gray-200">
                <div class="w-[60%] h-full rounded-lg bg-primary"></div>
            </div>
            <p class="text-gray-400 text-xs">60% completed</p>
        </nav>

        <section class="flex justify-between items-end">
            <div class="flex-1 space-y-1">
                <p class="text-gray-500 text-base mb-2"># Module {{ props.module.number }}</p>
                <h4 class="font-semibold text-xl max-w-sm"> {{ props.module.title }} </h4>
                <p class="text-gray-400 text-xs">{{ props.numberOfSections }} Sections - {{  props.totalDuration }}</p>
            </div>

            <div>
                <Button variant="outline" class="rounded-full">
                    <Icon name="solar:alt-arrow-right-outline"/>
                </Button>
            </div>
        </section>
    </div>
</template>