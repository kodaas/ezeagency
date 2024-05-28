<script setup lang="ts">
const route = useRoute();
const { data, pending } = useLazyAsyncData("Overview", () =>
    OverviewService().getOverview(route.params.section as string),
);
</script>

<template>
    <div v-if="pending">
        <Loader class="w-full h-full grid place-items-center" />
    </div>

    <div v-if="!data && !pending" class="p-16 text-center space-y-2">
        <Empty class="w-52 mx-auto" />
        <p>😥 No Data Found</p>
    </div>

    <section
        v-if="data && !pending"
        class="px-0 py-5 lg:p-5 space-y-5 min-h-screen"
    >
        <h1 class="font-medium text-2xl max-w-md">{{ data?.module_title }}</h1>

        <p class="text-lg">
            {{ data?.section_index }}. {{ data?.section_title }}
        </p>

        <p class="text-gray-600 prose" v-html="data?.content"></p>
    </section>
</template>
