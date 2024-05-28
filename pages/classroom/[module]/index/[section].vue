<script setup lang="ts">
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useMediaQuery } from "@vueuse/core";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/toast/use-toast";

definePageMeta({
    layout: false,
});

const { toast } = useToast()
const isTablet = useMediaQuery("(max-width: 900px)");
const showNav = ref(false);
const route = useRoute();

const { data: videoData, pending: videoPending } = useLazyAsyncData("videoData", () =>
    VideoService().getVideo(route.params.section as string),
);

const { data: module, pending: modulePending } = useLazyAsyncData("module", () => ModuleService().getModule(route.params.module as string))

const { data: User, pending: UserPending } = useLazyAsyncData("User", () => MetaDataService().getMetaData())

const pending = computed(() => videoPending.value || UserPending.value || modulePending.value);

const videoEnded = ($event: number) => {
    const { data, error } = useAsyncData("TimeStamp", () => MetaDataService().updateMetaData({ video_timestamp: Number($event), active_section: videoData.value?.next_section_id }))

    if (error.value) {
        toast({
            title: "Error",
            description: error.value.message,
            variant: "destructive",
        });

        return
    }

    console.log(data)

    showNav.value = true
}

const next = () => {
    if (videoData.value?.next_section_id) navigateTo(`/classroom/${route.params.module}/${videoData.value.next_section_id}`)
}

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
        aspectRatio: '16:9'
    };
});

onMounted(() => {
    if (!route.params.section) navigateTo(`/classroom/${route.params.module}`);
});
</script>

<template>
    <AspectRatio v-if="pending" :ratio="16 / 9" class="bg-muted rounded-3xl overflow-hidden">
        <Loader />
    </AspectRatio>

    <AspectRatio v-else :ratio="16 / 9" class="bg-muted rounded-3xl overflow-hidden">
        <ClassroomVideoPlayer @videoEnded="videoEnded" :timestamp="User?.video_timestamp!" :options="options" />
    </AspectRatio>

    

    <nav class="mt-5" v-if="showNav">
        <Button v-if="videoData?.next_section_id" @click="next()">Next Section</Button>
        <NuxtLink v-else :to="module?.quiz_url" target="_blank">
            <Button class="w-full">
                <Icon class="text-xl mr-2" name="solar:question-square-line-duotone" />
                Take Quiz
            </Button>
        </NuxtLink>
    </nav>

    <section class="mt-8 overflow-y-auto">
        <Tabs default-value="overview" class="w-full min-h-screen overflow-y-auto">
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
