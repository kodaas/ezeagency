<script setup lang="ts">
import type { ClassroomSectionDto } from "~/models";

const emit = defineEmits(["updateSection"]);

const props = defineProps<{
    id: ClassroomSectionDto["id"];
    index: ClassroomSectionDto["index"];
    created_at: ClassroomSectionDto["created_at"]; // ISO 8601 date-time format
    video_id: ClassroomSectionDto["video_id"];
    title: ClassroomSectionDto["title"];
    class_module: ClassroomSectionDto["class_module"];
    status: "pending" | "active" | "completed";
}>();

onMounted(() => {
    console.log("Mounted");
});
</script>

<template>
    <NuxtLink
        v-if="props.status !== 'pending'"
        :to="`/classroom/${props.class_module}/${props.id}`"
        exact-active-class="bg-primary-foreground border border-primary shadow-sm"
        :class="{ '': props.status === 'active' }"
        class="flex justify-between items-center gap-2 bg-transparent p-4 rounded-xl cursor-pointer hover:bg-primary-foreground hover:shadow-sm active:scale-95 transition-all duration-300 ease-in-out"
    >
        <p>{{ props.index }}. {{ props.title }}</p>

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
    </NuxtLink>

    <div
        v-else
        class="flex justify-between items-center gap-2 bg-transparent p-4 rounded-xl cursor-not-allowed"
    >
        <p>{{ props.index }}. {{ props.title }}</p>

        <Icon
            v-if="props.status === 'pending'"
            class="text-gray-500 text-2xl"
            name="solar:lock-keyhole-outline"
        />
    </div>
</template>
