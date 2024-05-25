<script setup lang="ts">
const props = defineProps<{
    id: string;
    index: number;
    title: string;
    status: number; // 0 - pending, 1 - current , 2 - done
    module: string;
}>();
</script>

<template>
    <NuxtLink
        :to="`/classroom?module=${props.module}&section=${props.id}`"
        class="flex justify-between items-center gap-2 bg-transparent p-4 rounded-xl cursor-pointer hover:bg-primary-foreground hover:shadow-sm active:scale-95 transition-all duration-300 ease-in-out"
    >
        <p>{{ props.index }}. {{ props.title }}</p>

        <Icon
            class="text-green-500 font-bold text-3xl"
            name="solar:check-read-outline"
        />
    </NuxtLink>
</template>
