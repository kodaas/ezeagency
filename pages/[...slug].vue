<script setup lang="ts">
import { Button } from "@/components/ui/button"
</script>

<template>
    <div class="grid h-screen place-content-center bg-white px-4">
      <div class="text-center">
        <h1 class="text-9xl font-black text-gray-200">404</h1>
    
        <p class="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</p>
    
        <p class="mt-4 text-gray-500">We can't find that page.</p>
    
        
        <NuxtLink to="/">
            <Button
            class="mt-6 inline-block rounded bg-primary px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
            >
            Go Back Home
        </Button>
    </NuxtLink>
      </div>
    </div>
  </template>