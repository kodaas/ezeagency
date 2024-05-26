<script setup lang="ts">
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useMediaQuery } from "@vueuse/core";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import type { ClassroomSectionDto } from "~/models";
import { transform } from "typescript";


definePageMeta({
    layout: false,
});

const isTablet = useMediaQuery("(max-width: 900px)");
const route = useRoute();
const { data: activeSection } = useLazyAsyncData("activeSection", () => SectionService().getSection(route.params.section as string))



const options = {
    sources: [
        {
            src: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
            // src: "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
            type: "application/x-mpegURL",
        },
    ],
    controls: true,
    loop: false,
    autoplay: false,
    preload: "auto",
    fluid: true,
    poster: "https://media.istockphoto.com/id/1223044329/photo/confident-man-teacher-wearing-headset-speaking-holding-online-lesson.jpg?s=612x612&w=0&k=20&c=xKYLqKd6obXrUazZg5PDCycrwPiFXHVEJzqi0lxh78Q=",
};




onMounted(() => {
    if (!route.params.section) navigateTo(`/classroom/${route.params.module}`)

    if (activeSection && activeSection.value?.status === "active")
        console.log()
});
</script>

<template>
    <AspectRatio v-if="isTablet" :ratio="16 / 9" class="bg-muted rounded-3xl overflow-hidden">
        <ClassroomVideoPlayer :options="{ ...options, aspectRatio: '16:9' }" />
    </AspectRatio>
    <AspectRatio v-if="!isTablet" :ratio="16 / 7" class="bg-muted rounded-3xl overflow-hidden">
        <ClassroomVideoPlayer :options="{ ...options, aspectRatio: '16:7' }" />
    </AspectRatio>

    <section class="mt-8">
        <Tabs default-value="overview" class="w-full h-full">
            <TabsList>
                <TabsTrigger value="overview"> Overview </TabsTrigger>
                <TabsTrigger value="resources"> Resources </TabsTrigger>
                <TabsTrigger value="questions"> Questions </TabsTrigger>
            </TabsList>

            <TabsContent class="" value="overview">
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
