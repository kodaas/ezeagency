<script setup lang="ts">
const route = useRoute()
</script>

<template>
    <nav class="pl-10 pt-10 pr-3 pb-3">
        <h1 class="font-medium text-2xl">Certificate</h1>

        <p>Coming Soon {{ route.params.id }}</p>
    </nav>
</template>
