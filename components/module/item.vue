<script setup lang="ts">
import { Button } from "@/components/ui/button";
import type { ClassroomModuleDto } from "~/models";

const props = defineProps<{
    id: ClassroomModuleDto["id"];
    index: ClassroomModuleDto["index"];
    title: ClassroomModuleDto["title"];
    number_of_sections: ClassroomModuleDto["number_of_sections"];
    duration: ClassroomModuleDto["duration"];
    status: "pending" | "active" | "completed";
    activeSection?: string;
    section_id: ClassroomModuleDto["section_id"];
}>();

const redirect = () => {
    if (props.status === "pending") {
        return;
    }

    if (props.status === "completed") {
        navigateTo(`/certificate/${props.section_id}`);
        return;
    }

    navigateTo(`/classroom/${props.id}/${props.activeSection}`);
};
</script>

<template>
    <div
        @click="redirect"
        :class="{
            'border-primary bg-primary-foreground hover:scale-105 transition-all cursor-pointer':
                props.status === 'active',
            'border-green-500 bg-green-50 cursor-pointer hover:scale-105 transition-all':
                props.status === 'completed',
        }"
        class="w-full border-2 rounded-lg p-5 space-y-12"
    >
        <nav>
            <h1 class="text-sm capitalize">
                {{ props.status }}
                <Icon
                    v-if="props.status === 'completed'"
                    class="text-green-500 font-bold text-3xl"
                    name="solar:check-read-outline"
                />

                <Icon
                    v-if="props.status === 'active'"
                    class="text-blue-500 text-2xl animate-pulse"
                    name="solar:alarm-play-line-duotone"
                />

                <Icon
                    v-if="props.status === 'pending'"
                    class="text-orange-500 text-2xl"
                    name="solar:alarm-line-duotone"
                />
            </h1>
        </nav>

        <section class="flex justify-between items-end">
            <div class="flex-1 space-y-1">
                <p class="text-gray-500 text-base mb-2">
                    # Module {{ props.index }}
                </p>
                <h4 class="font-semibold text-xl max-w-sm">
                    {{ props.title }}
                </h4>
                <p class="text-gray-400 text-xs">
                    {{ props.number_of_sections }} Sections 
                    <!-- {{ props.duration }} -->
                </p>
            </div>

            <div>
                <Button
                    v-if="props.status !== 'pending'"
                    variant="outline"
                    class="rounded-full"
                >
                    <Icon name="solar:alt-arrow-right-outline" />
                </Button>
            </div>
        </section>
    </div>
</template>
