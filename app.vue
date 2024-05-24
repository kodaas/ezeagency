<script setup lang="ts">
import Toaster from '@/components/ui/toast/Toaster.vue'
import { useOnline } from '@vueuse/core';

const isOnline = useOnline()
</script>

<template>
  <Toaster />
  <NuxtLoadingIndicator />

  <NuxtLayout>
    <NuxtPage v-if="isOnline" />

    <main v-else>
      <h1>Offline</h1>
    </main>
  </NuxtLayout>
</template>
