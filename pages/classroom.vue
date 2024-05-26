<script setup lang="ts">
import videojs from "video.js";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useMediaQuery } from "@vueuse/core";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type ModuleData = {
    progress: number;
    video: {
        src: string;
        poster: string;
    };
    sections: [
        {
            id: string;
            index: number;
            title: string;
            status: number; // 0 - pending, 1 - current , 2 - done
            module: string;
        },
    ];
};

definePageMeta({
    layout: false,
});

const isTablet = useMediaQuery("(max-width: 900px)");
const route = useRoute();
const ModuleData = ref<null>(null);

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
    if (!route.query.module || !route.query.section) {
        navigateTo("/");
    }

    console.log(route.query.module, route.query.section);
});
</script>

<template>
    <NuxtLayout name="classroom">
        <AspectRatio
            v-if="isTablet"
            :ratio="16 / 9"
            class="bg-muted rounded-3xl overflow-hidden"
        >
            <ClassroomVideoPlayer
                :options="{ ...options, aspectRatio: '16:9' }"
            />
        </AspectRatio>

        <AspectRatio
            v-if="!isTablet"
            :ratio="16 / 7"
            class="bg-muted rounded-3xl overflow-hidden"
        >
            <ClassroomVideoPlayer
                :options="{ ...options, aspectRatio: '16:7' }"
            />
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

        <template #sidebar>
            <div class="bg-foreground rounded-3xl p-5 space-y-3 mb-10">
                <p class="text-background text-left">Progress</p>
                <div class="space-y-1">
                    <p class="text-gray-400 text-right text-xs">
                        60% completed
                    </p>
                    <div class="h-1.5 rounded-lg overflow-hidden bg-gray-200">
                        <div class="w-[60%] h-full rounded-lg bg-primary"></div>
                    </div>
                </div>
            </div>

            <div class="mt-10 h-full">
                <p>Course Sections (5)</p>

                <div class="mt-5 space-y-3 h-[60vh] lg:h-[60%] overflow-y-auto">
                    <!-- <ClassroomSectionItem  /> -->

                    <div
                        class="flex justify-between items-center gap-2 bg-transparent p-4 rounded-xl"
                    >
                        <p>2. Definition</p>

                        <Icon
                            class="text-green-500 font-bold text-3xl"
                            name="solar:check-read-outline"
                        />
                    </div>

                    <div
                        class="flex justify-between items-center border border-primary gap-2 bg-primary-foreground p-4 rounded-xl"
                    >
                        <p>3. Advantages</p>

                        <Icon
                            class="text-blue-500 text-2xl animate-pulse"
                            name="solar:alarm-play-line-duotone"
                        />
                    </div>

                    <div
                        class="flex justify-between items-center gap-2 bg-transparent p-4 rounded-xl"
                    >
                        <p>4. Disadvantages</p>

                        <Icon
                            class="text-orange-500 text-2xl"
                            name="solar:alarm-line-duotone"
                        />
                    </div>

                    <div
                        class="flex justify-between items-center gap-2 bg-transparent p-4 rounded-xl"
                    >
                        <p>5. Conclusion</p>

                        <Icon
                            class="text-orange-500 text-2xl"
                            name="solar:alarm-line-duotone"
                        />
                    </div>
                </div>

                <Button disabled class="mt-10 w-full">
                    <Icon
                        class="text-xl mr-2"
                        name="solar:question-square-line-duotone"
                    />
                    Take Quiz
                </Button>
            </div>
        </template>
    </NuxtLayout>
</template>
