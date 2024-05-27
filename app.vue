<script setup lang="ts">
import Toaster from "@/components/ui/toast/Toaster.vue";
import { useOnline } from "@vueuse/core";

const isOnline = useOnline();
</script>

<template>
    <Title>Ezeagency - Learn</Title>
    <Toaster />
    <NuxtLoadingIndicator />

    <NuxtLayout>
        <NuxtPage v-if="isOnline" />

        <Offline v-else />
    </NuxtLayout>
</template>
