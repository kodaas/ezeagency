<script setup lang="ts">
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useMediaQuery } from "@vueuse/core";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import type { ClassroomSectionDto } from "~/models";

definePageMeta({
    layout: false,
});

const isTablet = useMediaQuery("(max-width: 900px)");
const route = useRoute();
const { data: activeSection, pending: sectionPending } = useLazyAsyncData(
    "activeSection",
    () => SectionService().getSection(route.params.section as string),
);

const { data: videoData, pending } = useLazyAsyncData("videoData", () =>
    VideoService().getVideo(route.params.section as string),
);

const options = computed(() => {
    return {
        sources: [
            {
                src: videoData.value?.src,
                type: videoData.value?.format,
            },
        ],
        controls: true,
        loop: false,
        autoplay: false,
        preload: "auto",
        fluid: true,
        poster: videoData.value?.poster,
    };
});

onMounted(() => {
    if (!route.params.section) navigateTo(`/classroom/${route.params.module}`);
});
</script>

<template>
    <AspectRatio
        v-if="isTablet && !pending"
        :ratio="16 / 9"
        class="bg-muted rounded-3xl overflow-hidden"
    >
        <ClassroomVideoPlayer :options="{ ...options, aspectRatio: '16:9' }" />
    </AspectRatio>

    <AspectRatio
        v-if="!isTablet && !pending"
        :ratio="16 / 7"
        class="bg-muted rounded-3xl overflow-hidden"
    >
        <ClassroomVideoPlayer :options="{ ...options, aspectRatio: '16:7' }" />
    </AspectRatio>

    <AspectRatio
        v-if="isTablet && pending"
        :ratio="16 / 9"
        class="bg-muted rounded-3xl overflow-hidden"
    >
        <Loader />
    </AspectRatio>

    <AspectRatio
        v-if="!isTablet && pending"
        :ratio="16 / 7"
        class="bg-muted rounded-3xl overflow-hidden"
    >
        <Loader />
    </AspectRatio>

    <section class="mt-8 overflow-y-auto">
        <Tabs
            default-value="overview"
            class="w-full min-h-screen overflow-y-auto"
        >
            <TabsList>
                <TabsTrigger value="overview"> Overview </TabsTrigger>
                <TabsTrigger value="resources"> Resources </TabsTrigger>
                <TabsTrigger value="questions"> Questions </TabsTrigger>
            </TabsList>

            <TabsContent class="min-h-screen overflow-y-auto" value="overview">
                <ClassroomOverview />
            </TabsContent>

            <TabsContent value="resources">
                <ClassroomResources />
            </TabsContent>

            <TabsContent value="questions">
                <ClassroomQuestions />
            </TabsContent>
        </Tabs>
    </section>
</template>
