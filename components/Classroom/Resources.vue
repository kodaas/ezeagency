<script setup lang="ts">
const route = useRoute();
const { data: resources, pending } = useLazyAsyncData("Resources", () =>
    ResourceService().getResource(route.params.section as string),
);
</script>

<template>
    <div v-if="pending">
        <Loader class="w-full h-full grid place-items-center" />
    </div>

    <section v-else class="px-0 py-5 lg:p-5 space-y-5">
        <h1 class="font-medium text-2xl max-w-md">Available Resources</h1>

        <div v-if="resources?.length === 0" class="p-16 text-center space-y-2">
            <Empty class="w-52 mx-auto" />
            <p>😥 No Resources Found</p>
        </div>

        <div v-else class="space-y-5 min-h-[150vh]">
            <File
                v-for="resource in resources"
                :key="resource.id"
                :document="resource"
            />
        </div>
    </section>
</template>
